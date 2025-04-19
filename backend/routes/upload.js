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
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Endpoint to generate project description
router.post("/generate", upload.fields([
  { name: "projectFile", maxCount: 1 }, 
  { name: "projectImage", maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || !req.files["projectFile"]) {
      return res.status(400).json({ error: "Project file is required" });
    }

    const filePath = req.files["projectFile"][0].path;
    const title = req.body.title;

    if (!title) {
      return res.status(400).json({ error: "Project title is required" });
    }

    // Read file content
    const content = fs.readFileSync(filePath, "utf-8");

    // Call Gemini API
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([
        `Read the following file and create a concise 3-4 sentence professional description for a portfolio project titled "${title}":`,
        content,
      ]);
      const response = await result.response;
      const description = response.text();

      // Image handling
      let imageUrl = null;
      if (req.files["projectImage"]) {
        const imagePath = req.files["projectImage"][0].path;
        // In a real app, you would process and store this image
        // Here we're just returning the relative path
        imageUrl = '/uploads/' + path.basename(imagePath);
      }

      res.status(200).json({ 
        title, 
        description,
        image: imageUrl
      });
    } catch (apiError) {
      console.error("Gemini API error:", apiError);
      
      // Fallback description if API fails
      const fallbackDescription = 
        `This is a project titled "${title}". It appears to be a ${getProjectType(content)} project. ` +
        `The project contains approximately ${content.length} characters of content.`;
      
      res.status(200).json({ 
        title, 
        description: fallbackDescription,
        image: null,
        note: "Used fallback description due to API error"
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

// Helper function to guess project type from content
function getProjectType(content) {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('<!doctype html') || lowerContent.includes('<html')) {
    return 'web development';
  } else if (lowerContent.includes('def ') || lowerContent.includes('import ') || lowerContent.includes('class ')) {
    return 'programming';
  } else if (lowerContent.includes('# ') || lowerContent.includes('## ')) {
    return 'documentation';
  } else {
    return 'text-based';
  }
}

module.exports = router;