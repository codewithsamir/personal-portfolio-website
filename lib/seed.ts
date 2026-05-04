import dbConnect from "./mongodb";
import PersonalInfo from "@/models/PersonalInfo";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Education from "@/models/Education";
import { personalInfo, projects, experience, skills, services, education } from "./data";

export async function seedDatabase() {
  await dbConnect();

  // Seed Personal Info
  const personalExists = await PersonalInfo.findOne();
  if (!personalExists) {
    await PersonalInfo.create(personalInfo);
    console.log("Seeded PersonalInfo");
  }

  // Seed Projects
  const projectsCount = await Project.countDocuments();
  if (projectsCount === 0) {
    await Project.insertMany(projects);
    console.log("Seeded Projects");
  }

  // Seed Experience
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.insertMany(experience);
    console.log("Seeded Experience");
  }

  // Seed Skills
  const skillsCount = await Skill.countDocuments();
  if (skillsCount === 0) {
    await Skill.insertMany(skills);
    console.log("Seeded Skills");
  }

  // Seed Services
  const servicesCount = await Service.countDocuments();
  if (servicesCount === 0) {
    await Service.insertMany(services);
    console.log("Seeded Services");
  }

  // Seed Education
  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.insertMany(education);
    console.log("Seeded Education");
  }
}
