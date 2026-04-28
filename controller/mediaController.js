import Media from "../models/mediaModel.js";




export const createMedia = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    if (!title || !type) {
      return res.status(400).json({ message: "Title & type required" });
    }

    const image = req.file?.path || "";

    // validation
    if (type === "blog" && (!description || !image)) {
      return res.status(400).json({
        message: "Blog needs image + description",
      });
    }

    if (type === "gallery" && !image) {
      return res.status(400).json({
        message: "Gallery needs image",
      });
    }

    const media = await Media.create({
      title: title.trim(),
      description: description || "",
      image,
      type,
    });

    res.status(201).json(media);

  } catch (err) {
    console.error(" CONTROLLER ERROR:", err);

    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// 📥 GET (filter by type)
export const getMedia = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const data = await Media.find(filter).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE
export const deleteMedia = async (req, res) => {
  try {
    const item = await Media.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};