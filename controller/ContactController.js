import Contact from "../models/ContactModel.js";


export const createContact = async (req, res) => {
  try {

     if (!req.body) {
      return res.status(400).json({ message: "No data received" });
    }
    const { name, email, phone, message } = req.body;

    // basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    // console.log(err);
  }
};

// 📥 GET ALL CONTACTS (admin use)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE CONTACT
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};