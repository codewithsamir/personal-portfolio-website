import mongoose, { Schema, Document } from "mongoose";

export interface IPersonalInfo extends Document {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  yearsOfExperience: string;
  learnerCount: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  resume: string;
  profileImage: string;
  footerDescription: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  footerLinks: { label: string; href: string }[];
  updatedAt: Date;
}

const PersonalInfoSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    yearsOfExperience: { type: String, required: true, default: "3+" },
    learnerCount: { type: String, required: true, default: "50,000+" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    location: { type: String, required: true },
    resume: { type: String, required: true },
    profileImage: { type: String },
    footerDescription: { type: String, default: "Designing and developing intentional digital experiences that bridge the gap between complexity and clarity." },
    socials: {
      github: { type: String, required: true },
      linkedin: { type: String, required: true },
      twitter: { type: String, required: true },
      instagram: { type: String },
      facebook: { type: String },
      youtube: { type: String },
    },
    footerLinks: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.PersonalInfo ||
  mongoose.model<IPersonalInfo>("PersonalInfo", PersonalInfoSchema);
