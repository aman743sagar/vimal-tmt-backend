import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: [true, "Review is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);