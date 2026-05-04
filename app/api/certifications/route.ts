import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Certification from "@/models/Certification";
import mongoose from "mongoose";

// Force refresh model in development
const CertificationModel = mongoose.models.Certification || Certification;

export async function GET() {
  try {
    await dbConnect();
    const certifications = await CertificationModel.find({}).sort({ order: 1, date: -1 });
    return NextResponse.json(certifications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const certification = await CertificationModel.create(body);
    return NextResponse.json(certification);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...body } = await req.json();
    const certification = await CertificationModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(certification);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await CertificationModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
