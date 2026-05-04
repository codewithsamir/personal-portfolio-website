import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import mongoose from "mongoose";

// Force refresh the model in development to ensure schema changes are picked up
// This prevents issues where new fields like 'description' are ignored by stale models.
const ExperienceModel = mongoose.models.Experience || Experience;

export async function GET() {
  try {
    await dbConnect();
    const experiences = await ExperienceModel.find({}).sort({ period: -1 });
    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("📝 Creating experience:", body);
    const experience = await ExperienceModel.create(body);
    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...body } = await req.json();
    console.log(`🔄 Updating experience ${id}:`, body);
    
    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const experience = await ExperienceModel.findByIdAndUpdate(id, body, { 
        returnDocument: "after",
        runValidators: true 
    });

    if (!experience) {
        return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    console.log("✅ Updated successfully:", experience);
    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await ExperienceModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
