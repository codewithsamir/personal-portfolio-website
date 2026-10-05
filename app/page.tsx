import { Navbar } from "@/app/_components/layout/Navbar";
import { Footer } from "@/app/_components/layout/Footer";
import { Hero } from "@/app/_components/sections/Hero";
import { About } from "@/app/_components/sections/About";
import { Skills } from "@/app/_components/sections/Skills";
import { Experience } from "@/app/_components/sections/Experience";
import { Projects } from "@/app/_components/sections/Projects";
import { Blog } from "@/app/_components/sections/Blog";
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
import BlogModel from "@/models/Blog";
import { sortExperiencesByLatest } from "@/lib/experience";

import { Metadata } from "next";
import { SITE_URL, PROFILE_IMAGE, PROFILE_LINKS } from "@/lib/site";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const personal = await PersonalInfo.findOne().lean();

  const name = personal?.name || "Samir Rain";
  const title = `${name} | Full Stack Developer in Nepal`;
  // Hand-written so it stays within ~155 chars; the DB summary is too long for a snippet
  const description = `${name} is a Full Stack Developer from Janakpur, Nepal with ${personal?.yearsOfExperience || "3+"} years of experience building fast, scalable web apps with React, Next.js, Django and Node.js.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      firstName: "Samir",
      lastName: "Rain",
      username: "codewithsamir",
      url: SITE_URL,
      siteName: name,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@samir_rain",
    },
  };
}

type JsonLdPersonal = {
  name?: string;
  role?: string;
  summary?: string;
  email?: string;
  updatedAt?: string;
  socials?: Record<string, string | undefined>;
};

function buildJsonLd(personal: JsonLdPersonal) {
  const name = personal.name || "Samir Rain";
  const socials = personal.socials || {};
  const sameAs = Array.from(
    new Set(
      [
        PROFILE_LINKS.github,
        PROFILE_LINKS.linkedin,
        PROFILE_LINKS.youtube,
        socials.github,
        socials.linkedin,
        socials.twitter,
        socials.instagram,
        socials.facebook,
        socials.youtube,
        ...PROFILE_LINKS.otherSites,
      ].filter((url) => typeof url === "string" && url.startsWith("http"))
    )
  );

  const image = {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#profile-image`,
    url: `${SITE_URL}${PROFILE_IMAGE}`,
    contentUrl: `${SITE_URL}${PROFILE_IMAGE}`,
    width: 800,
    height: 800,
    caption: name,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name,
        alternateName: ["Samir Rain Portfolio", "codewithsamir"],
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${name} | Full Stack Developer in Nepal`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: { "@id": `${SITE_URL}/#profile-image` },
        dateModified: personal.updatedAt,
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name,
        alternateName: "codewithsamir",
        url: SITE_URL,
        image,
        jobTitle: personal.role || "Full Stack Developer",
        description: personal.summary,
        email: personal.email ? `mailto:${personal.email}` : undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Janakpur",
          addressRegion: "Madhesh Province",
          addressCountry: "NP",
        },
        nationality: { "@type": "Country", name: "Nepal" },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Rajarshi Janak University",
        },
        knowsAbout: [
          "Full Stack Development",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Django",
          "Python",
          "MongoDB",
          "AI Integration",
        ],
        sameAs,
      },
    ],
  };
}

async function getPortfolioData() {
  await dbConnect();
  
  const [personal, projects, experience, skills, services, education, certifications, posts] = await Promise.all([
    PersonalInfo.findOne().lean(),
    Project.find().sort({ createdAt: -1 }).lean(),
    ExperienceModel.find().lean(),
    Skill.find().sort({ order: 1 }).lean(),
    Service.find().sort({ order: 1 }).lean(),
    EducationModel.find().sort({ order: 1, createdAt: -1 }).lean(),
    Certification.find().sort({ order: 1, createdAt: -1 }).lean(),
    BlogModel.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean(),
  ]);

  const sortedExperience = sortExperiencesByLatest(experience as any[]);

  return {
    personal: JSON.parse(JSON.stringify(personal)),
    projects: JSON.parse(JSON.stringify(projects)),
    experience: JSON.parse(JSON.stringify(sortedExperience)),
    skills: JSON.parse(JSON.stringify(skills)),
    services: JSON.parse(JSON.stringify(services)),
    education: JSON.parse(JSON.stringify(education)),
    certifications: JSON.parse(JSON.stringify(certifications)),
    posts: JSON.parse(JSON.stringify(posts)),
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

  const jsonLd = buildJsonLd(data.personal);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <Hero personalInfo={data.personal} />
      <About personalInfo={data.personal} projectsCount={data.projects.length} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Blog posts={data.posts} />
      <Services services={data.services} />
      <Education education={data.education} />
      <Certifications certifications={data.certifications} />
      <Contact personalInfo={data.personal} />
      <Footer personalInfo={data.personal} />
    </>
  );
}
