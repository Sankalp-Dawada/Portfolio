// Update src/js/add-project.js
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
// We'll now store more info including file paths
let projects = [
  { id: 1, title: "Project 1", date: "Jan 2024", filePath: null, imageUrl: null },
  { id: 2, title: "Project 2", date: "Dec 2023", filePath: null, imageUrl: null }
];

// Load projects from localStorage if available
function loadProjects() {
  const savedProjects = localStorage.getItem('portfolioProjects');
  if (savedProjects) {
    projects = JSON.parse(savedProjects);
  }
  updateProjectsList();
}

// Save projects to localStorage
function saveProjects() {
  localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

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
      // Add the new project to our projects array with file/image paths
      const newProject = {
        id: Date.now(), // Use timestamp for unique ID
        title: formData.get("title"),
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        description: data.description,
        filePath: data.filePath || null,
        imageUrl: data.image || null
      };
      
      projects.push(newProject);
      saveProjects(); // Save to localStorage
      
      // Update the projects list UI
      updateProjectsList();
      
      // Show preview of new project
      preview.innerHTML = `
        <div class="project">
          <div class="project-header">
            <h3>${newProject.title}</h3>
            <span class="date">${newProject.date}</span>
          </div>
          <div class="project-content">
            ${newProject.imageUrl ? `<img src="${newProject.imageUrl}" alt="${newProject.title}">` : ""}
            <p>${newProject.description}</p>
          </div>
          ${newProject.imageUrl ? "<p>✅ Image uploaded successfully!</p>" : ""}
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
window.deleteProject = async function(id) {
  const projectToDelete = projects.find(p => p.id === id);
  
  if (projectToDelete && confirm(`Are you sure you want to delete "${projectToDelete.title}"?`)) {
    try {
      // Delete the file from server
      const response = await fetch("http://localhost:5000/delete-project", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filePath: projectToDelete.filePath,
          imageUrl: projectToDelete.imageUrl
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Remove from local array
        projects = projects.filter(project => project.id !== id);
        
        // Save to localStorage
        saveProjects();
        
        // Update UI
        updateProjectsList();
        
        alert("Project deleted successfully!");
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(`Failed to delete project: ${error.message}`);
    }
  }
};

// Function to add the preview project to the portfolio (global so it can be called from HTML)
window.addToPortfolio = function() {
  alert("Project added to your portfolio successfully!");
  preview.innerHTML = `<p>Project has been added to your portfolio.</p>`;
  
  // In this implementation, we've already saved to localStorage
  // A real app would save to server/database here as well
};

// Initialize the projects list when the page loads
document.addEventListener("DOMContentLoaded", function() {
  loadProjects();
});