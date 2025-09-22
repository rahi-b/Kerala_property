// lib/models/Admin.js
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  mobile: { type: String },
  password: { type: String, required: true, select: false },
}, { timestamps: true });

// AdminSchema.index({ email: 1 }, { unique: true });

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
