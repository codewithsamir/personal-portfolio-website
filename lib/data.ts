export const personalInfo = {
  name: "Samir Rain",
  title: "Frontend Developer / Full Stack Architect",
  tagline: "Crafting digital experiences that merge aesthetic precision with technical excellence.",
  email: "samir.rain@example.com",
  phone: "+977-9800000000",
  whatsapp: "https://wa.me/9779800000000",
  location: "Kathmandu, Nepal",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/samir-rain",
    linkedin: "https://linkedin.com/in/samir-rain",
    twitter: "https://twitter.com/samir_rain",
  },
  summary: "Highly skilled Frontend Developer with a passion for building scalable, performance-oriented, and accessible web applications. Expert in React, Next.js, and modern CSS frameworks, with a strong eye for UI/UX design and a problem-solving mindset.",
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 85 },
      { name: "Next.js API Routes", level: 90 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "Prisma", level: 80 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Vercel", level: 95 },
      { name: "Docker", level: 70 },
      { name: "Postman", level: 85 },
    ],
  },
];

export const experience = [
  {
    role: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "Remote",
    period: "Jan 2024 - Present",
    bullets: [
      "Led the migration of a legacy React app to Next.js 14, improving LCP by 40%.",
      "Architected a reusable component library using Tailwind CSS and Radix UI.",
      "Mentored junior developers and implemented CI/CD pipelines for frontend deployments.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Creative Digital Agency",
    location: "Kathmandu, Nepal",
    period: "Jun 2022 - Dec 2023",
    bullets: [
      "Developed high-performance e-commerce platforms for international clients.",
      "Integrated complex payment gateways and third-party APIs.",
      "Optimized database queries in MongoDB, reducing response time by 30%.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Startup Hub",
    location: "Kathmandu, Nepal",
    period: "Feb 2022 - May 2022",
    bullets: [
      "Built responsive landing pages and interactive dashboards.",
      "Collaborated with designers to implement pixel-perfect UI components.",
    ],
  },
];

export const projects = [
  {
    title: "Vibe Code Editor",
    slug: "vibe-code-editor",
    description: "An AI-powered online code editor with real-time execution and collaboration.",
    techStack: ["Next.js", "Monaco Editor", "WebContainers", "Prisma", "MongoDB"],
    liveUrl: "https://vibe-editor.vercel.app",
    githubUrl: "https://github.com/samir-rain/vibe-editor",
    featured: true,
    image: "/images/projects/vibe-editor.jpg",
  },
  {
    title: "Nexus Dashboard",
    slug: "nexus-dashboard",
    description: "Modern analytics dashboard with real-time data visualization and customizable widgets.",
    techStack: ["React", "Tailwind CSS", "Recharts", "Framer Motion"],
    liveUrl: "https://nexus-dashboard.vercel.app",
    githubUrl: "https://github.com/samir-rain/nexus-dashboard",
    featured: true,
    image: "/images/projects/nexus-dashboard.jpg",
  },
  {
    title: "EcoShop",
    slug: "ecoshop",
    description: "Full-stack e-commerce platform focused on sustainable products.",
    techStack: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://ecoshop-demo.vercel.app",
    githubUrl: "https://github.com/samir-rain/ecoshop",
    featured: false,
    image: "/images/projects/ecoshop.jpg",
  },
];

export const services = [
  {
    title: "Web Development",
    description: "Building fast, scalable, and modern web applications tailored to your business needs.",
    icon: "Code",
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually stunning user interfaces that provide exceptional user experiences.",
    icon: "Layout",
  },
  {
    title: "API Integration",
    description: "Seamlessly connecting your application with third-party services and building robust custom APIs.",
    icon: "Link",
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    period: "2019 - 2023",
  },
];
