import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
    const SMTP_SECURE = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : SMTP_PORT === 465;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    if (!SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP credentials (SMTP_USER / SMTP_PASS)");
      return NextResponse.json({ error: "Server email is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Who will receive the notification email
    const TO_ADDRESS = process.env.EMAIL_TO || process.env.EMAIL_USER || SMTP_USER;
    const FROM_ADDRESS = process.env.EMAIL_FROM || SMTP_USER;

    // Helpful debug log for incoming payload (avoid logging secrets)
    try {
      console.log("/api/send-mail received payload:", JSON.stringify(body));
    } catch (e) {
      console.log("/api/send-mail received payload (could not stringify)");
    }

    // Auto-generate subject lines based on form type and available name/company
    const formType = (body.type || "website").toString().toLowerCase();
    const firstName = body.firstName || body.first_name || "";
    const lastName = body.lastName || body.last_name || "";
    const name = (body.name || `${firstName} ${lastName}`.trim() || "").trim();
    const company = body.companyName || body.company_name || body.company || "";

    let subjectPrefix = "New Submission";
    if (formType.includes("contact")) subjectPrefix = "New Contact Form Submission";
    else if (formType.includes("job") || formType.includes("career") || formType.includes("application")) subjectPrefix = "New Career Form Submission";
    else if (formType.includes("service") || formType.includes("request") || company) subjectPrefix = "New Service Request";

    const identifier = name || company || body.email || "(no name)";
    const subject = `${subjectPrefix} – ${identifier}`;

    // Mask SMTP user for logs
    const maskedUser = SMTP_USER ? SMTP_USER.replace(/(.).+(@.*)/, "$1***$2") : "(none)";
    console.log(`Preparing email -> from: ${process.env.EMAIL_FROM || SMTP_USER}, to: ${TO_ADDRESS}, smtpUser: ${maskedUser}, host: ${SMTP_HOST}:${SMTP_PORT}, secure:${SMTP_SECURE}`);

    const buildFieldsHtml = (data) => {
      let rows = "";
      for (const key of Object.keys(data)) {
        if (data[key] === null || data[key] === undefined) continue;

        // If this looks like a file/resume object, show metadata only
        if (typeof data[key] === "object" && data[key].filename && data[key].content) {
          try {
            const filename = escapeHtml(String(data[key].filename));
            const contentType = escapeHtml(String(data[key].contentType || "application/octet-stream"));
            const size = Buffer.from(String(data[key].content), "base64").length;
            rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${escapeHtml(key)}</td><td style=\"padding:6px 12px;\">Filename: ${filename}<br/>Type: ${contentType}<br/>Size: ${size} bytes</td></tr>`;
          } catch (e) {
            rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${escapeHtml(key)}</td><td style=\"padding:6px 12px;\">[file]</td></tr>`;
          }
          continue;
        }

        if (typeof data[key] === "object") {
          try {
            rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${escapeHtml(key)}</td><td style=\"padding:6px 12px;\">${escapeHtml(JSON.stringify(data[key]))}</td></tr>`;
          } catch (e) {
            rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${escapeHtml(key)}</td><td style=\"padding:6px 12px;\">[object]</td></tr>`;
          }
        } else {
          rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${escapeHtml(key)}</td><td style=\"padding:6px 12px;\">${escapeHtml(String(data[key]))}</td></tr>`;
        }
      }
      return rows;
    };

    const buildHtml = (data) => {
      const rows = buildFieldsHtml(data);
      return `
        <div style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;\">
          <h2>${escapeHtml(subject)}</h2>
          <table style=\"border-collapse:collapse;\">${rows}</table>
        </div>
      `;
    };

    const buildText = (data) => {
      const lines = [];
      for (const key of Object.keys(data)) {
        const v = data[key];
        if (v === null || v === undefined) continue;
        if (typeof v === 'object' && v.filename && v.content) {
          try {
            const size = Buffer.from(String(v.content), 'base64').length;
            lines.push(`${key}: filename=${v.filename}; type=${v.contentType || 'application/octet-stream'}; size=${size} bytes`);
          } catch (e) {
            lines.push(`${key}: [file]`);
          }
          continue;
        }
        if (typeof v === 'object') {
          try {
            lines.push(`${key}: ${JSON.stringify(v)}`);
          } catch (e) {
            lines.push(`${key}: [object]`);
          }
        } else {
          lines.push(`${key}: ${String(v)}`);
        }
      }
      return `${subject}\n\n${lines.join('\n')}`;
    };

    // simple HTML escaper to avoid accidental HTML injection
    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    // Build attachments if resume is provided (supporting base64 payload)
    const attachments = [];
    if (body.resume) {
      // Expecting resume to be an object { filename, content (base64), contentType }
      try {
        const r = body.resume;
        if (r.content && r.filename) {
          const buffer = Buffer.from(r.content, "base64");
          attachments.push({ filename: r.filename, content: buffer, contentType: r.contentType || undefined });
          console.log(`Attachment prepared: ${r.filename} (${buffer.length} bytes)`);
        } else {
          console.log("resume object present but missing filename/content; skipping attachment");
        }
      } catch (e) {
        console.error("Error preparing attachment:", e);
      }
    }

    // Send admin email (with form details and possible attachment)
    const adminMail = {
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject,
      text: buildText(body),
      html: buildHtml(body),
      attachments: attachments.length ? attachments : undefined,
    };

    let info;
    try {
      info = await transporter.sendMail(adminMail);
      console.log("Admin email sent:", info && info.messageId ? info.messageId : info);
    } catch (err) {
      console.error("Failed to send admin email:", err);
      return NextResponse.json({ error: "Failed to send admin email" }, { status: 500 });
    }

    // Send confirmation email to user (if email present in payload)
    if (body.email) {
      const userEmail = String(body.email);
      const formLabel = subjectPrefix || (body.type || "Submission");
      const userSubject = `Thanks for your ${formLabel}`;
      const userRows = buildFieldsHtml(body);
      const userHtml = `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;">
          <h2>Thank you${name ? `, ${escapeHtml(name)}` : ""}!</h2>
          <p>We have received your ${escapeHtml(formLabel.toString().toLowerCase())}.</p>
          <p>Our team will review your submission and get back to you shortly.</p>
          <hr />
          <h4>What you submitted</h4>
          <table style="border-collapse:collapse;">${userRows}</table>
        </div>
      `;

      try {
        const userInfo = await transporter.sendMail({
          from: FROM_ADDRESS,
          to: userEmail,
          subject: userSubject,
          text: `Thank you${name ? `, ${name}` : ""}. We received your ${formLabel.toString().toLowerCase()}.`,
          html: userHtml,
        });
        console.log("Confirmation email sent to user:", userInfo && userInfo.messageId ? userInfo.messageId : userInfo);
      } catch (err) {
        console.error("Failed to send confirmation email to user:", err);
        // don't fail the whole request if confirmation fails; just log
      }
    } else {
      console.log("No user email provided; skipping confirmation email.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-mail error:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
