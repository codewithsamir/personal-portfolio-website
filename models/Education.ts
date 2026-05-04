import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  period: string;
  location: string;
  order: number;
}

const EducationSchema: Schema = new Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);
