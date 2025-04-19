const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// File upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Endpoint to generate project description
router.post("/generate", upload.fields([{ name: "projectFile" }, { name: "projectImage" }]), async (req, res) => {
  try {
    const filePath = req.files["projectFile"][0].path;
    const title = req.body.title;

    const content = fs.readFileSync(filePath, "utf-8");

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([
      `Read the following and give a 3-4 sentence project summary:\nTitle: ${title}`,
      content,
    ]);
    const response = await result.response;
    const description = response.text();

    res.status(200).json({ title, description });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

module.exports = router;
