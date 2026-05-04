import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Name of the Lucide icon
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);
