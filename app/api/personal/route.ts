import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PersonalInfo from "@/models/PersonalInfo";

export async function GET() {
  try {
    await dbConnect();
    const info = await PersonalInfo.findOne();
    return NextResponse.json(info);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const info = await PersonalInfo.findOneAndUpdate({}, body, { returnDocument: 'after', upsert: true });
    return NextResponse.json(info);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
