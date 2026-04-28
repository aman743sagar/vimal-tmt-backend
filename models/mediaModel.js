import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "", // blog ke liye
    },

    image: {
      type: String,
      default: "", // blog + gallery
    },

    type: {
      type: String,
      enum: ["blog", "gallery", "certificate"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);