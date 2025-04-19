require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// → Configure file uploads to /backend/uploads
const upload = multer({
  dest: path.join(__dirname, "uploads/")
});

// → Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /generate-description
 * Expects: multipart/form-data with field “projectFile” (and optionally “projectImage”)
 * Returns: { description: string }
 */
app.post(
  "/generate-description",
  upload.single("projectFile"),
  async (req, res) => {
    try {
      // 1) Read uploaded file
      const filePath = req.file.path;
      const fileContent = fs.readFileSync(filePath, "utf-8");
      fs.unlinkSync(filePath); 

      // 2) Ask Gemini to summarize it
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Summarize this project for a developer portfolio in 3–4 sentences:\n\n${fileContent}`;
      const generation = await model.generateContent(prompt);
      const response = await generation.response;
      const description = response.text().trim();

      // 3) Send the description back
      res.json({ description });
    } catch (err) {
      console.error("❌ Gemini error:", err);
      res.status(500).json({ error: "Failed to generate description" });
    }
  }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
