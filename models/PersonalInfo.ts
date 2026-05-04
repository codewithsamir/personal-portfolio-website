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
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram?: string;
  };
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
    socials: {
      github: { type: String, required: true },
      linkedin: { type: String, required: true },
      twitter: { type: String, required: true },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.PersonalInfo ||
  mongoose.model<IPersonalInfo>("PersonalInfo", PersonalInfoSchema);
