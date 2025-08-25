import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, details, plan } = await req.json();

        if (!name || !email || !plan) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL, // e.g. escstack@gmail.com
                pass: process.env.COMPANY_EMAIL_PASS, // Gmail App Password
            },
        });

        // build email HTML
        const htmlContent = `
      <h2>Thank you, ${name}!</h2>
      <p>You selected the <strong>${plan.name}</strong> plan at <b>${plan.price}</b>.</p>
      <p><strong>Project Details:</strong></p>
      <p>${details || "No details provided."}</p>
      <hr/>
      <p>We’ll reach out shortly to initiate the discussion 🚀</p>
      <p>— escStack Team</p>
    `;

        // send to client + company
        await transporter.sendMail({
            from: `"escStack" <${process.env.COMPANY_EMAIL}>`,
            to: [email, "ayazhussain4483@gmail.com"],
            subject: `escStack - Confirmation for ${plan.name} Plan`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ Email send error:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
