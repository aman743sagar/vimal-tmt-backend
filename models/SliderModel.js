// models/SliderModel.js
import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Slider", sliderSchema);