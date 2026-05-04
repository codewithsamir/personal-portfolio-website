import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PersonalInfo from '@/models/PersonalInfo';
import Experience from '@/models/Experience';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Service from '@/models/Service';
import Education from '@/models/Education';
import Certification from '@/models/Certification';

export async function GET() {
  try {
    await dbConnect();

    // Clear existing data
    await Promise.all([
      PersonalInfo.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Service.deleteMany({}),
      Education.deleteMany({}),
      Certification.deleteMany({})
    ]);

    // Seed Personal Info
    await PersonalInfo.create({
      name: "Samir Rain",
      role: "Full Stack Developer",
      tagline: "Building digital excellence through code and education.",
      summary: "Full Stack Developer with 3+ years of experience designing and delivering end-to-end web applications. Proficient in React.js, Next.js, Django, and Node.js with a strong understanding of both frontend and backend systems.",
      yearsOfExperience: "3+",
      learnerCount: "50,000+",
      email: "teamofsamir@gmail.com",
      phone: "+977-9824823877",
      whatsapp: "https://wa.me/9779824823877",
      location: "Janakpur, Nepal",
      resume: "/resume.pdf",
      socials: {
        github: "https://github.com/codewithsamir",
        linkedin: "https://linkedin.com/in/samir-rain",
        twitter: "https://twitter.com/samir_rain"
      }
    });

    // Seed Experience
    await Experience.create([
      {
        company: "Digineptronics R&D Based Company",
        role: "Full Stack Developer Intern",
        period: "Nov 2025 – Feb 2026",
        description: "Built responsive frontend components for PadhneAI, an AI-powered learning platform, using Next.js, Tailwind CSS, and ShadCN UI. Integrated Django REST APIs into the frontend layer for seamless data flow and real-time functionality.",
        location: "Janakpur, Nepal",
        order: 1
      },
      {
        company: "Saan Coaching & Training Center",
        role: "Coding & Web Development Instructor",
        period: "Mar 2023 – Mar 2026",
        description: "Taught HTML, CSS, JavaScript, React.js, and Python to beginner and intermediate learners in structured, hands-on sessions. Mentored students in building real-world projects and guided them on career paths in software engineering.",
        location: "Janakpur, Nepal",
        order: 2
      },
      {
        company: "Freelance Web Developer",
        role: "Self-Employed / Remote",
        period: "Mar 2022 – Present",
        description: "Designed and developed responsive web applications for clients using React.js, Next.js, and Django. Handled end-to-end project delivery including requirements gathering, development, testing, and deployment on Vercel and Railway.",
        location: "Remote",
        order: 3
      }
    ]);

    // Seed Projects
    await Project.create([
      {
        title: "Vibe Code Editor",
        description: "An AI-powered browser-based IDE enabling users to write, run, and debug Node.js apps without local setup. Features real-time AI code generation with Monaco Editor.",
        techStack: ["Next.js", "TypeScript", "WebContainer API", "Monaco Editor", "MongoDB", "Prisma"],
        liveUrl: "https://vibe-editor.vercel.app",
        githubUrl: "https://github.com/codewithsamir",
        image: "https://res.cloudinary.com/dw5xgvtcv/image/upload/v1714800000/portfolio-projects/vibe-preview.jpg",
        slug: "vibe-code-editor"
      },
      {
        title: "Indoor B2B E-Commerce",
        description: "A B2B platform connecting suppliers and retailers across Nepal. Built product listing, order management, and secure authentication.",
        techStack: ["Next.js", "Tailwind CSS", "ShadCN UI", "Django REST API", "PostgreSQL"],
        liveUrl: "https://indor.com.np",
        githubUrl: "#",
        image: "https://res.cloudinary.com/dw5xgvtcv/image/upload/v1714800000/portfolio-projects/indoor-preview.jpg",
        slug: "indoor-b2b"
      },
      {
        title: "PadhneAI",
        description: "AI-powered education platform targeting Nepali students. Developed user interfaces and learning dashboards.",
        techStack: ["Next.js", "Tailwind CSS", "Firebase", "Django REST API"],
        liveUrl: "https://padhneai.com",
        githubUrl: "#",
        image: "https://res.cloudinary.com/dw5xgvtcv/image/upload/v1714800000/portfolio-projects/padhneai-preview.jpg",
        slug: "padhneai"
      }
    ]);

    // Seed Skills
    await Skill.create([
      {
        category: "Frontend",
        items: [
          { name: "React.js", level: 95 },
          { name: "Next.js", level: 92 },
          { name: "TypeScript", level: 88 },
          { name: "Tailwind CSS", level: 95 },
          { name: "ShadCN UI", level: 90 }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js", level: 85 },
          { name: "Django", level: 80 },
          { name: "NestJS", level: 75 },
          { name: "PostgreSQL", level: 82 }
        ]
      }
    ]);

    // Seed Education
    await Education.create({
      institution: "Rajarshi Janak University",
      degree: "Bachelor of Science in Computer Science & IT",
      period: "Sep 2021 – Dec 2025",
      location: "Janakpur, Nepal",
      order: 1
    });

    // Seed Certifications
    await Certification.create([
      { name: "Meta Frontend Developer", issuer: "Coursera / Meta", date: "2023", link: "#", order: 1 },
      { name: "Next.js Advanced Patterns", issuer: "Frontend Masters", date: "2024", link: "#", order: 2 },
      { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2022", link: "#", order: 3 },
      { name: "JavaScript Algorithms", issuer: "FreeCodeCamp", date: "2021", link: "#", order: 4 },
    ]);

    return NextResponse.json({ message: "Database seeded successfully with your actual resume data!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
