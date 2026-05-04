import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Education from "@/models/Education";

export async function GET() {
  try {
    await dbConnect();
    const education = await Education.find({}).sort({ period: -1 });
    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const education = await Education.create(body);
    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...body } = await req.json();
    const education = await Education.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Education.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
