// app/api/schedule-call/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, date, time, message } = await request.json();

    // Create email transporter (using Gmail)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to YOU (the business owner)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "info.escstack@gmail.com", // Your email
      subject: `📞 New Call Scheduled - ${name}`,
      html: `
        <h2>New Call Scheduled!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
        <br/>
        <p>Please contact them to confirm the call.</p>
      `,
    });

    // Optional: Confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Call Scheduled - EscStack",
      html: `
        <h2>Your Call Has Been Scheduled</h2>
        <p>Dear ${name},</p>
        <p>Thank you for scheduling a call with EscStack!</p>
        <p><strong>Your Scheduled Time:</strong> ${date} at ${time}</p>
        <p>Our team will contact you shortly to confirm the details.</p>
        ${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ""}
        <br/>
        <p>Best regards,<br/>EscStack Team</p>
        <p>Phone: 03163797857</p>
        <p>Email: info.escstack@gmail.com</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Call scheduled successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Error scheduling call" },
      { status: 500 }
    );
  }
}
