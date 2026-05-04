import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await dbConnect();
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
