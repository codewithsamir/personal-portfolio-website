import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");
    const limit = searchParams.get("limit");

    if (slug) {
      const post = await Blog.findOne({ slug });
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(post);
    }

    let query = Blog.find({});

    if (published === "true") {
      query = query.where({ published: true });
    }

    if (featured === "true") {
      query = query.where({ featured: true });
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const posts = await query.sort({ publishedAt: -1, createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const post = await Blog.create(body);
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const bodyData = await req.json();
    const { id, ...body } = bodyData;

    const post = await Blog.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const post = await Blog.findById(id);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    if (post.coverImage && post.coverImage.includes("cloudinary.com")) {
      try {
        const parts = post.coverImage.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex !== -1) {
          const publicIdWithExt = parts.slice(uploadIndex + 2).join("/");
          const publicId = publicIdWithExt.split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        // console.error("Cloudinary delete error:", cloudinaryError);
      }
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
