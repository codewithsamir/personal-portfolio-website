import { Navbar } from "@/app/_components/layout/Navbar";
import { Footer } from "@/app/_components/layout/Footer";
import { Hero } from "@/app/_components/sections/Hero";
import { About } from "@/app/_components/sections/About";
import { Skills } from "@/app/_components/sections/Skills";
import { Experience } from "@/app/_components/sections/Experience";
import { Projects } from "@/app/_components/sections/Projects";
import { Services } from "@/app/_components/sections/Services";
import { Education } from "@/app/_components/sections/Education";
import { Certifications } from "@/app/_components/sections/Certifications";
import { Contact } from "@/app/_components/sections/Contact";
import dbConnect from "@/lib/mongodb";
import PersonalInfo from "@/models/PersonalInfo";
import Project from "@/models/Project";
import ExperienceModel from "@/models/Experience";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import EducationModel from "@/models/Education";
import Certification from "@/models/Certification";

import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const personal = await PersonalInfo.findOne().lean();
  
  if (!personal) return { title: "Portfolio" };

  const name = personal.name;
  const role = personal.role;
  const summary = personal.summary;

  return {
    metadataBase: new URL("https://samirrain.com.np"),
    title: `${name} | ${role}`,
    description: summary,
    keywords: [
      name,
      role,
      "Full Stack Developer Nepal",
      "Next.js Developer",
      "Django Developer",
      "AI Web Developer",
      "Software Engineer Janakpur",
      "React Specialist",
      `Portfolio of ${name}`,
    ],
    authors: [{ name: name }],
    creator: name,
    openGraph: {
      title: `${name} | ${role}`,
      description: summary,
      url: "https://samirrain.com.np",
      siteName: `${name} Portfolio`,
      images: [
        {
          url: "https://samirrain.com.np/profile.jpeg",
          width: 1200,
          height: 630,
          alt: `${name} Portfolio Overview`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${role}`,
      description: summary,
      images: ["https://samirrain.com.np/profile.jpeg"],
      creator: "@samir_rain",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

async function getPortfolioData() {
  await dbConnect();
  
  const [personal, projects, experience, skills, services, education, certifications] = await Promise.all([
    PersonalInfo.findOne().lean(),
    Project.find().sort({ createdAt: -1 }).lean(),
    ExperienceModel.find().sort({ order: 1, createdAt: -1 }).lean(),
    Skill.find().sort({ order: 1 }).lean(),
    Service.find().sort({ order: 1 }).lean(),
    EducationModel.find().sort({ order: 1, createdAt: -1 }).lean(),
    Certification.find().sort({ order: 1, createdAt: -1 }).lean(),
  ]);

  return {
    personal: JSON.parse(JSON.stringify(personal)),
    projects: JSON.parse(JSON.stringify(projects)),
    experience: JSON.parse(JSON.stringify(experience)),
    skills: JSON.parse(JSON.stringify(skills)),
    services: JSON.parse(JSON.stringify(services)),
    education: JSON.parse(JSON.stringify(education)),
    certifications: JSON.parse(JSON.stringify(certifications)),
  };
}

export default async function Home() {
  const data = await getPortfolioData();

  if (!data.personal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold font-space-grotesk">Portfolio Initialization</h1>
          <p className="text-muted-foreground">Please run the seed command to populate your database.</p>
          <code className="block p-4 bg-muted rounded-xl text-sm">GET /api/seed</code>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Hero personalInfo={data.personal} />
      <About personalInfo={data.personal} projectsCount={data.projects.length} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Services services={data.services} />
      <Education education={data.education} />
      <Certifications certifications={data.certifications} />
      <Contact personalInfo={data.personal} />
      <Footer personalInfo={data.personal} />
    </>
  );
}
