import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";

// Use the exported model from models/Project.ts
const ProjectModel = Project;

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    let query = ProjectModel.find({});
    
    if (featured === "true") {
      query = query.where({ featured: true });
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const projects = await query.sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('📝 POST Body:', JSON.stringify(body, null, 2));
    const project = await ProjectModel.create(body);
    console.log('✅ POST Result:', JSON.stringify(project, null, 2));
    return NextResponse.json(project);
  } catch (error: any) {
    console.error('❌ POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const bodyData = await req.json();
    const { id, ...body } = bodyData;
    console.log(`🔄 PUT Body for ${id}:`, JSON.stringify(body, null, 2));
    
    const project = await ProjectModel.findByIdAndUpdate(id, body, { 
        returnDocument: "after",
        runValidators: true 
    });
    console.log('✅ PUT Result:', JSON.stringify(project, null, 2));
    return NextResponse.json(project);
  } catch (error: any) {
    console.error('❌ PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const project = await ProjectModel.findById(id);
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    // Delete image from Cloudinary if it exists
    if (project.image && project.image.includes("cloudinary.com")) {
      try {
        // Extract public_id from URL
        // Example: .../image/upload/v12345/folder/name.jpg -> folder/name
        const parts = project.image.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex !== -1) {
          const publicIdWithExt = parts.slice(uploadIndex + 2).join("/"); // Skip 'upload' and 'version'
          const publicId = publicIdWithExt.split(".")[0];
          console.log(`🗑️ Deleting Cloudinary asset: ${publicId}`);
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
      }
    }

    await ProjectModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
