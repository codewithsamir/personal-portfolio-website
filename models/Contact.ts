import mongoose, { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
