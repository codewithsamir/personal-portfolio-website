import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IExperience extends Document {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  bullets?: string[];
  order: number;
}

const ExperienceSchema: Schema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    bullets: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Force refresh in development to pick up schema changes
if (process.env.NODE_ENV === 'development') {
    delete models.Experience;
}

const Experience = models.Experience || model<IExperience>("Experience", ExperienceSchema);

export default Experience;
