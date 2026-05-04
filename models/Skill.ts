import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  category: string;
  items: {
    name: string;
    level: number;
  }[];
  order: number;
}

const SkillSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        level: { type: Number, required: true, min: 0, max: 100 },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);
