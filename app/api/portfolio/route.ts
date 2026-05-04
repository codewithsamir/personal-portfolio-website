import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PersonalInfo from "@/models/PersonalInfo";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Education from "@/models/Education";

export async function GET() {
  try {
    await dbConnect();

    const [personal, projects, experience, skills, services, education] = await Promise.all([
      PersonalInfo.findOne(),
      Project.find().sort({ createdAt: -1 }),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      Skill.find().sort({ order: 1 }),
      Service.find().sort({ order: 1 }),
      Education.find().sort({ order: 1, createdAt: -1 }),
    ]);

    return NextResponse.json({
      personal,
      projects,
      experience,
      skills,
      services,
      education,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
