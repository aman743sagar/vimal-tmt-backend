import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },

    grade: {
      type: String, // Fe 500, Fe 550
    
    },

    diameter: {
      type: String, // 8mm, 10mm, 12mm
    },

    length: {
      type: String, // 12m, etc.
      default: "12m",
    },

    weight: {
      type: String, // kg per piece
    },

    price: {
      type: Number,
    },

    features: [
      {
        type: String, 
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);