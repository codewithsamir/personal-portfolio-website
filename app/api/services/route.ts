import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find().sort({ order: 1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const service = await Service.create(body);
    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;
    const service = await Service.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Service deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
