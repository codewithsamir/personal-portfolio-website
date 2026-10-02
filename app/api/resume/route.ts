import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/mongodb";
import PersonalInfo from "@/models/PersonalInfo";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

// Cloudinary blocks public delivery of PDFs on this account (401), so resumes
// hosted there are fetched through the authenticated download API and served
// from here. Any other link is just redirected to.
export async function GET(req: Request) {
  try {
    await dbConnect();
    const info: any = await PersonalInfo.findOne().lean();
    const resume: string | undefined = info?.resume;

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const match = resume.match(
      new RegExp(
        `^https?://res\\.cloudinary\\.com/${process.env.CLOUDINARY_CLOUD_NAME}/(image|raw)/upload/(?:v\\d+/)?(.+)$`
      )
    );

    if (!match) {
      return NextResponse.redirect(new URL(resume, req.url));
    }

    const [, resourceType, path] = match;
    // Raw assets keep the extension in their public_id; image assets don't.
    const extIndex = path.lastIndexOf(".");
    const format = extIndex > -1 ? path.slice(extIndex + 1) : "";
    const publicId = resourceType === "raw" || extIndex === -1 ? path : path.slice(0, extIndex);

    const downloadUrl = cloudinary.utils.private_download_url(
      publicId,
      resourceType === "raw" ? "" : format,
      { resource_type: resourceType, type: "upload" }
    );

    const file = await fetch(downloadUrl);
    if (!file.ok) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const name = `${(info?.name || "resume").replace(/\s+/g, "-")}-Resume.${format || "pdf"}`;
    return new NextResponse(file.body, {
      headers: {
        "Content-Type": file.headers.get("content-type") || "application/pdf",
        "Content-Disposition": `inline; filename="${name}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
