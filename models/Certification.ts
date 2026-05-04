import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICertification extends Document {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  order: number;
}

const CertificationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    link: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Certification = models.Certification || model<ICertification>("Certification", CertificationSchema);

export default Certification;
