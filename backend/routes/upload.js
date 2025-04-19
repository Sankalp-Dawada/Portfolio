const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
require("dotenv").config();

// Upload setup
const upload = multer({ dest: "uploads/" });

// Gemini API function (simplified mockup)
async function askGemini(content) {
    const prompt = `Summarize this project for a portfolio: ${content}`;
    
    // Replace this with real API call using fetch or axios
    return "This is a Gemini-generated summary based on the uploaded content.";
}

router.post("/", upload.fields([{ name: "projectFile" }, { name: "projectImage" }]), async (req, res) => {
    const filePath = req.files.projectFile[0].path;
    const image = req.files.projectImage ? req.files.projectImage[0].filename : null;

    const content = fs.readFileSync(filePath, "utf-8");

    const description = await askGemini(content);

    res.json({
        title: req.body.title || "Untitled Project",
        description,
        image: image ? `/uploads/${image}` : null
    });
});

module.exports = router;
