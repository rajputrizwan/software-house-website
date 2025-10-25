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

    // Build a simple text/html body from the incoming payload
    const subject = body.subject || `New ${body.type || "website"} submission`;

    const buildHtml = (data) => {
      let rows = "";
      for (const key of Object.keys(data)) {
        // Skip large or binary objects like files
        if (data[key] === null || data[key] === undefined) continue;
        if (typeof data[key] === "object") {
          try {
            rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${key}</td><td style=\"padding:6px 12px;\">${JSON.stringify(data[key])}</td></tr>`;
          } catch (e) {
            rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${key}</td><td style=\"padding:6px 12px;\">[object]</td></tr>`;
          }
        } else {
          rows += `<tr><td style=\"padding:6px 12px;font-weight:600;\">${key}</td><td style=\"padding:6px 12px;\">${String(data[key])}</td></tr>`;
        }
      }
      return `
        <div style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;\">
          <h2>${subject}</h2>
          <table style=\"border-collapse:collapse;\">${rows}</table>
        </div>
      `;
    };

    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject,
      text: Object.entries(body)
        .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`)
        .join("\n"),
      html: buildHtml(body),
    });

    console.log("Email sent:", info && info.messageId ? info.messageId : info);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-mail error:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
