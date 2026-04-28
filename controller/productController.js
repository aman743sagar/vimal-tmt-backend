import mongoose from "mongoose";
import Product from "../models/productModel.js";


export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const {
      name,
      description,
      grade,
      diameter,
      length,
      weight,
      price,
      features,
    } = req.body;

    if (!name || !description ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const product = await Product.create({
      name,
      description,
      grade,
      diameter,
      length,
      weight,
      price,
      features: features ? JSON.parse(features) : [],
      image: req.file.path, // ✅ Cloudinary URL
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("this is the", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    console.log("Product:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    console.error(err); // 🔥 add this
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const image = req.file
      ? req.file.path // ✅ Cloudinary
      : req.body.image;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image,
        features: req.body.features
          ? JSON.parse(req.body.features)
          : [],
      },
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};