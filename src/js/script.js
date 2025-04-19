// Check authentication status when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // Add logout event listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('admin');
            updateAuthUI();
            alert('Logged out successfully');
        });
    }
});

// Update UI based on authentication status
function updateAuthUI() {
    const isAdmin = localStorage.getItem('admin') === 'true';
    const loginNavItem = document.getElementById('loginNavItem');
    const logoutNavItem = document.getElementById('logoutNavItem');
    
    if (isAdmin) {
        if (loginNavItem) loginNavItem.style.display = 'none';
        if (logoutNavItem) logoutNavItem.style.display = 'block';
    } else {
        if (loginNavItem) loginNavItem.style.display = 'block';
        if (logoutNavItem) logoutNavItem.style.display = 'none';
    }
}

// Filter projects based on search input
function filterProjects() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const title = project.querySelector('h3').textContent.toLowerCase();
        project.style.display = title.includes(input) ? 'block' : 'none';
    });
}

// Function to add project from form (if it exists on the page)
const projectForm = document.getElementById("projectForm");
if (projectForm) {
    projectForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const res = await fetch("http://localhost:5000/api/upload/generate", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            const projectHTML = `
                <div class="project">
                    <div class="project-header">
                        <h3>${data.title}</h3>
                    </div>
                    <div class="project-content">
                        ${data.image ? `<img src="${data.image}" alt="Project Image">` : ""}
                        <p>${data.description}</p>
                    </div>
                </div>
            `;

            const previewElement = document.getElementById("newProjectPreview");
            if (previewElement) {
                previewElement.innerHTML = projectHTML;
            }
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Failed to add project. Please try again.");
        }
    });
}