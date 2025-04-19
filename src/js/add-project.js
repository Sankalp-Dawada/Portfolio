window.addEventListener("DOMContentLoaded", () => {
    const isAdmin = localStorage.getItem("admin");
    if (isAdmin !== "true") {
      alert("Access denied. Please log in as admin.");
      window.location.href = "login.html";
    }
  });
  
  // Handle form submission
  const projectForm = document.getElementById("projectForm");
  const preview = document.getElementById("newProjectPreview");
  
  projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(projectForm);
  
    try {
      const response = await fetch("http://localhost:5000/generate-description", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.description) {
        preview.innerHTML = `
          <h3>${formData.get("title")}</h3>
          <p>${data.description}</p>
          ${formData.get("projectImage") ? "<p>Image uploaded successfully!</p>" : ""}
        `;
      } else {
        preview.textContent = "Failed to generate description.";
      }
    } catch (error) {
      console.error("Error uploading project:", error);
      preview.textContent = "An error occurred.";
    }
  });
  