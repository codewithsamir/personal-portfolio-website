import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  techStack: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  image: { type: String }, // NEW FIELD
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Force refresh the model in development to ensure schema changes are picked up
if (process.env.NODE_ENV === 'development') {
    delete models.Project;
}

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
