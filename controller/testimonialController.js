// controllers/TestimonialController.js
import Testimonial from "../models/testimonialModal.js";

// ➕ CREATE
export const createTestimonial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, rating, review } = req.body;

    if (!name || !rating || !review) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const testimonial = await Testimonial.create({
      name,
      rating: Number(rating), // ✅ safe type
      review,
      image: req.file.path, // ✅ Cloudinary URL
    });

    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 GET ALL
export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE
export const deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE
export const updateTestimonial = async (req, res) => {
  try {
    const image = req.file
      ? req.file.path // ✅ Cloudinary
      : req.body.image;

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        rating: Number(req.body.rating),
        review: req.body.review,
        image,
      },
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};