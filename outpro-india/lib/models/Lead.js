import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    message: { type: String, required: true },
    source: { type: String, default: "website-contact-form" },
  },
  { timestamps: true }
);

// Avoid model overwrite errors during Next.js hot-reload in development.
export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
