# 🚀 Sankalp Dawada's Dynamic Portfolio Website

This is a personal portfolio website where you can showcase your projects and dynamically add new ones. It includes:

- A clean portfolio layout with responsive design
- A search bar for filtering projects
- A secure admin login system with Firebase
- A form to add new projects with:
  - File upload (e.g., README, text files)
  - Image upload
  - AI-generated description using Google Gemini API
- Project management (add/delete) with persistent storage

---

## 🧠 Features

- ✅ Display projects with title, image, description, and links
- ✅ AI-generated project summaries from uploaded content
- ✅ Add projects dynamically from the admin panel
- ✅ Upload and preview project images
- ✅ Integration with Gemini 1.5 Pro API for smart project descriptions
- ✅ Secure admin authentication via Firebase
- ✅ Persistent project storage using localStorage
- ✅ Complete project deletion (files and data)

---

## 🏧 Project Structure

```
portfolio/
├── index.html              # Main portfolio UI
├── src/
│   ├── css/                # Styling files
│   │   ├── style.css       # Main styles
│   │   ├── login.css       # Login page styles
│   │   └── add-project.css # Admin panel styles
│   ├── html/               # HTML components
│   │   ├── login.html      # Admin login page
│   │   └── add-project.html# Project management panel
│   ├── js/                 # JavaScript files
│   │   ├── script.js       # Main portfolio logic
│   │   ├── add-project.js  # Project management logic
│   │   ├── login.js        # Login handling
│   │   ├── auth.js         # Authentication module
│   │   ├── firebase-config.js # Firebase setup
│   │   └── login-utils.js  # Additional login utilities
│   └── imgs/               # Image assets
├── uploads/                # Stores uploaded files and images
├── backend/
│   ├── server.js           # Express server with Gemini integration
│   ├── app.js              # Alternative Express server
│   ├── routes/
│   │   └── upload.js       # Handles file uploads and Gemini AI
│   ├── package.json        # Backend dependencies
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

Create a `.env` file (or update existing):

```
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run Backend Server

```bash
node server.js
```

> Your API will run at `http://localhost:5000`.

### 4. Open Frontend

Use **Live Server (VS Code extension)** or open `index.html` directly in your browser.

### 5. Login to Admin Panel

- Navigate to the Login page using the navbar
- Use your admin credentials (set up in Firebase)
- After logging in, you'll have access to the project management panel

---

## ✨ How It Works

1. **Authentication**:
   - Admin credentials are securely stored in Firebase
   - Login state is managed via localStorage for simplicity

2. **Adding Projects**:
   - Fill in the **Add Project** form with a title, project file, and optional image
   - On submission, the file is uploaded to the backend
   - Backend reads the file and sends it to Gemini AI
   - Gemini returns a project description
   - The project data is saved to localStorage and displayed on the main page

3. **Project Management**:
   - Projects can be deleted, which removes both the data and associated files
   - Projects persist across sessions via localStorage

4. **Search Functionality**:
   - Projects can be filtered in real-time using the search bar

---

## 🤖 Using Gemini API

The application uses Google's Gemini 1.5 Pro model to automatically generate project descriptions. When a file is uploaded, the content is sent to the Gemini API, which returns a concise 3-4 sentence description perfect for a portfolio showcase.

If the API call fails, the system falls back to a basic description based on file type and content length.

---

## 📸 Sample Demo

![Portfolio Screenshot](screenshot.png)

---

## 📌 TODO

- [ ] Add database storage for projects (MongoDB or SQL)
- [ ] Implement project editing functionality
- [ ] Improve UI/UX for mobile devices
- [ ] Add social sharing options for projects
- [ ] Implement categories/tags for better project organization
- [ ] Add analytics to track portfolio visits

---

## 👨‍💻 Author

**Sankalp Dawada**  
Connect with me on [LinkedIn](https://www.linkedin.com/in/sankalp-dawada-578782321/) | GitHub: [@Sankalp-Dawada](https://github.com/Sankalp-Dawada)

---

## 🔧 Troubleshooting

**Login/Logout Issues:**
- Clear browser cache and localStorage
- Ensure Firebase configuration is correct

**Gemini API Errors:**
- Verify your API key is correct and has sufficient permissions
- Check that the model name is current (currently using "gemini-1.5-pro")

**File Upload Issues:**
- Check that the upload directory has proper write permissions
- Verify file size limits in the multer configuration