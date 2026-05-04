import mongoose, { Schema, model, models } from 'mongoose';

const ThemeHistorySchema = new Schema({
    primaryColor: String,
    accentColor: String,
    name: String,
    timestamp: { type: Date, default: Date.now }
});

const ThemeSchema = new Schema({
  primaryColor: { type: String, default: '#0ea5e9' },
  accentColor: { type: String, default: '#8b5cf6' },
  borderRadius: { type: String, default: '1rem' },
  fontFamily: { type: String, default: 'Space Grotesk' },
  darkMode: { type: Boolean, default: true },
  history: [ThemeHistorySchema]
});

const Theme = models.ProjectTheme || model('ProjectTheme', ThemeSchema);

export default Theme;
