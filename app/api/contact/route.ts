import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // 1. Save to Database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });
    await newContact.save();

    // 2. Send Email to Gmail
    // We send it to your team email defined in env or personal info
    const recipientEmail = process.env.GMAIL_USER || "teamofsamir@gmail.com";
    
    await sendMail({
        to: recipientEmail,
        name: name,
        subject: subject,
        body: `From: ${name} (${email})\n\n${message}`
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
