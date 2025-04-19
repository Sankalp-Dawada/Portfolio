// Update backend/server.js with the correct Gemini API settings
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

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Initialize Gemini AI client with the correct model name
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /generate-description
 * Expects: multipart/form-data with field "projectFile" (and optionally "projectImage")
 * Returns: { description: string }
 */
app.post(
  "/generate-description",
  upload.fields([
    { name: "projectFile", maxCount: 1 },
    { name: "projectImage", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // Check if file exists
      if (!req.files || !req.files["projectFile"]) {
        return res.status(400).json({ error: "Project file is required" });
      }

      // Read uploaded file
      const filePath = req.files["projectFile"][0].path;
      const fileContent = fs.readFileSync(filePath, "utf-8");
      
      // Keep track of project files - don't delete them immediately
      // They'll be needed for display
      
      // Process image if exists
      let imageUrl = null;
      if (req.files["projectImage"]) {
        const imagePath = req.files["projectImage"][0].path;
        // Creating a relative path from the upload folder
        imageUrl = '/uploads/' + path.basename(imagePath);
      }

      // Try using Gemini API to generate description
      try {
        // Updated to use the correct model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Using a more recent model version
        const prompt = `Summarize this project for a developer portfolio in 3–4 sentences:\n\n${fileContent}`;
        const generation = await model.generateContent(prompt);
        const response = await generation.response;
        const description = response.text().trim();
        
        // Add project title information
        const title = req.body.title || 'Untitled Project';
        const date = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        // Send the description back
        res.json({ 
          title, 
          description, 
          image: imageUrl,
          date,
          filePath // Include file path for potential deletion later
        });
      } catch (err) {
        console.error("❌ Gemini error:", err);
        
        // Fallback description if API fails
        const fallbackDescription = 
          `This project appears to be a ${getProjectType(fileContent)} project. ` +
          `It contains approximately ${fileContent.length} characters of content. ` +
          `The file was successfully uploaded and can be viewed on the portfolio.`;
        
        // Add project title information
        const title = req.body.title || 'Untitled Project';
        const date = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        res.json({ 
          title, 
          description: fallbackDescription, 
          image: imageUrl,
          date,
          filePath, // Include file path for potential deletion later
          note: "Used fallback description due to API error"
        });
      }
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Failed to generate description" });
    }
  }
);

// Helper function to guess project type from content (for fallback)
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

// Add endpoint to delete a project
app.delete('/delete-project', express.json(), (req, res) => {
  const { filePath, imageUrl } = req.body;
  
  // Delete project file if exists
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  // Delete project image if exists
  if (imageUrl) {
    const imagePath = path.join(__dirname, '..', imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  
  res.json({ success: true, message: "Project deleted successfully" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);