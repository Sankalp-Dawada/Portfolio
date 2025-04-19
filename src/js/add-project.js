// Check admin status immediately when script loads
(function checkAdminStatus() {
  const isAdmin = localStorage.getItem("admin") === "true";
  if (!isAdmin) {
    alert("Access denied. Please log in as admin.");
    window.location.href = "login.html";
  }
})();

// Handle logout
document.getElementById("logoutBtn").addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("admin");
  alert("Logged out successfully");
  window.location.href = "../../index.html";
});

// Project data (in a real app, this would come from a database)
let projects = [
  { id: 1, title: "Project 1", date: "Jan 2024" },
  { id: 2, title: "Project 2", date: "Dec 2023" }
];

// Handle form submission
const projectForm = document.getElementById("projectForm");
const preview = document.getElementById("newProjectPreview");

projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(projectForm);

  try {
    // Visual feedback during API call
    preview.innerHTML = `<p>Generating description... Please wait.</p>`;
    
    const response = await fetch("http://localhost:5000/generate-description", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    if (data.description) {
      // Add the new project to our projects array
      const newProject = {
        id: projects.length + 1,
        title: formData.get("title"),
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      
      projects.push(newProject);
      
      // Update the projects list UI
      updateProjectsList();
      
      // Show preview of new project
      preview.innerHTML = `
        <div class="project">
          <div class="project-header">
            <h3>${formData.get("title")}</h3>
            <span class="date">${newProject.date}</span>
          </div>
          <p>${data.description}</p>
          ${formData.get("projectImage").name ? "<p>✅ Image uploaded successfully!</p>" : ""}
        </div>
        <button class="primary-btn" onclick="addToPortfolio()">Add to Portfolio</button>
      `;
      
      // Reset form
      projectForm.reset();
      
    } else {
      preview.innerHTML = `<p>Failed to generate description: ${data.error || 'Unknown error'}</p>`;
    }
  } catch (error) {
    console.error("Error uploading project:", error);
    preview.innerHTML = `<p>Error: ${error.message || 'Failed to connect to server'}</p>`;
  }
});

// Update the projects list in the UI
function updateProjectsList() {
  const projectsList = document.getElementById("projectsList");
  
  if (projects.length === 0) {
    projectsList.innerHTML = `<p class="info-text">No projects found.</p>`;
    return;
  }
  
  let html = '';
  projects.forEach(project => {
    html += `
      <div class="project-item" data-id="${project.id}">
        <div class="project-item-title">${project.title}</div>
        <div class="project-actions">
          <button class="primary-btn danger-btn" onclick="deleteProject(${project.id})">Delete</button>
        </div>
      </div>
    `;
  });
  
  projectsList.innerHTML = html;
}

// Function to delete a project (global so it can be called from the HTML)
window.deleteProject = function(id) {
  if (confirm(`Are you sure you want to delete "${projects.find(p => p.id === id).title}"?`)) {
    projects = projects.filter(project => project.id !== id);
    updateProjectsList();
    
    // In a real app, you would also delete from server/database here
    alert("Project deleted successfully!");
  }
};

// Function to add the preview project to the portfolio (global so it can be called from HTML)
window.addToPortfolio = function() {
  alert("Project added to portfolio successfully!");
  preview.innerHTML = `<p>Project has been added to your portfolio.</p>`;
  
  // In a real app, you would save to server/database here
};

// Initialize the projects list when the page loads
document.addEventListener("DOMContentLoaded", updateProjectsList);