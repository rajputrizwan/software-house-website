import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const formData = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      budget,
      companyName,
      companyUrl,
      region,
      services,
      projectDetails,
      lookingForJob,
    } = formData;

    // ✅ 1. Send Company Notification Email
    const { data: companyData, error: companyError } = await resend.emails.send(
      {
        from: process.env.RESEND_FROM_EMAIL, // e.g., onboarding@resend.dev or hello@yourdomain.com
        to: process.env.RESEND_TO_EMAIL, // your company inbox
        subject: `🚀 New Contact Submission from ${firstName} ${lastName}`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color:#4f46e5;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Website:</strong> ${companyUrl || "Not provided"}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Services:</strong> ${
            Array.isArray(services)
              ? services.map((s) => `<span>${s}</span>`).join(", ")
              : "None"
          }</p>
          <p><strong>Project Details:</strong><br>${
            projectDetails?.replace(/\n/g, "<br>") || "Not provided"
          }</p>
          ${
            lookingForJob
              ? `<p style="color:red;font-weight:bold;">🎯 This person is interested in joining your team!</p>`
              : ""
          }
        </div>
      `,
      }
    );

    if (companyError) throw new Error(companyError.message);

    // ✅ 2. Send Confirmation Email to User
    const { data: userData, error: userError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email, // Send to user’s entered email
      subject: `✅ Thanks for contacting ${companyName || "our team"}!`,
      html: `
        <div style="font-family: Arial, sans-serif; color:#333; background:#f9fafb; padding:20px; border-radius:8px;">
          <h2 style="color:#4f46e5;">Hi ${firstName},</h2>
          <p>Thank you for reaching out to us! 🎉</p>
          <p>We’ve received your message and our team will get back to you within 24 hours.</p>
          <p>Here’s a quick summary of your submission:</p>
          <ul>
            <li><strong>Company:</strong> ${companyName || "Not provided"}</li>
            <li><strong>Budget:</strong> ${budget || "Not provided"}</li>
            <li><strong>Services:</strong> ${
              Array.isArray(services) ? services.join(", ") : "Not specified"
            }</li>
          </ul>
          <p>You can reply directly to this email if you have more details to share.</p>
          <br/>
          <p>Best regards,<br/><strong>The ${
            companyName || "Company"
          } Team</strong></p>
        </div>
      `,
    });

    if (userError) throw new Error(userError.message);

    // ✅ Final Success Response
    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
