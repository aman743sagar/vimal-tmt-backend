import Slider from "../models/SliderModel.js";

// 📥 GET ALL
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ ADD SLIDER
export const addSlider = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const slider = await Slider.create({
      image: req.file.path, // ✅ Cloudinary URL
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE
export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);

    if (!slider) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE
export const updateSlider = async (req, res) => {
  try {
    const image = req.file
      ? req.file.path // ✅ Cloudinary
      : req.body.image;

    const updated = await Slider.findByIdAndUpdate(
      req.params.id,
      {
        image,
        title: req.body.title,
        description: req.body.description,
      },
      { returnDocument: "after" } // ✅ updated syntax
    );

    if (!updated) {
      return res.status(404).json({ message: "Slider not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};