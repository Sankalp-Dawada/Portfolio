# 🚀 Sankalp Dawada's Dynamic Portfolio Website

This is a personal portfolio website where you can showcase your projects and dynamically add new ones. It includes:

- A clean portfolio layout
- A search bar for filtering projects
- A form to add new projects with:
  - File upload (e.g., README, text)
  - Image upload
  - AI-generated description using Google Gemini

---

## 🧠 Features

- ✅ Display projects with title, image, description, and links
- ✅ AI-generated project summaries from uploaded content
- ✅ Add projects dynamically from the frontend
- ✅ Upload and preview project images
- ✅ Uses Gemini API to generate project descriptions

---

## 🏧 Project Structure

```
portfolio/
├── index.html              # Main portfolio UI
├── style.css               # Styling
├── script.js               # JS for dynamic interaction
├── uploads/                # Stores uploaded files and images
├── backend/
│   ├── app.js              # Express server
│   ├── routes/
│   │   └── upload.js       # Handles file uploads and Gemini AI
│   └── .env                # API keys and environment variables
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/portfolio-ai.git
cd portfolio-ai
```

### 2. Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run Backend Server

```bash
node app.js
```

> Your API will run at `http://localhost:5000`.

### 4. Open Frontend

Use **Live Server (VS Code extension)** or open `index.html` directly in your browser.

---

## ✨ How It Works

1. Fill in the **Add Project** form with a title, project file, and optional image.
2. On submission:
   - The file is uploaded to the backend.
   - Backend reads the file and sends it to Gemini AI.
   - Gemini returns a project description.
3. The new project is rendered dynamically on the page.

---

## 🤖 Using Gemini API

> Integration with the real Gemini Flash API coming soon!

Currently using a mock summary. Replace with actual Gemini API logic in `routes/upload.js`.

---

## 📸 Sample Demo

![Portfolio Screenshot](screenshot.png)

---

## 📌 TODO

- [ ] Add real Gemini API integration
- [ ] Save projects permanently (e.g., to JSON or a database)
- [ ] Improve UI/UX for mobile
- [ ] Add admin login for project submissions

---

## 📃 License

MIT License. Feel free to use and modify!

---

## 👨‍💻 Author

**Sankalp Dawada**  
Connect with me on [LinkedIn](https://www.linkedin.com/in/sankalp-dawada-578782321/) | GitHub: [@Sankalp-Dawada](https://github.com/Sankalp-Dawada)

