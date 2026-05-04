import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({});
    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const skill = await Skill.create(body);
    return NextResponse.json(skill);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...body } = await req.json();
    const skill = await Skill.findByIdAndUpdate(id, body, { returnDocument: "after" });
    return NextResponse.json(skill);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
