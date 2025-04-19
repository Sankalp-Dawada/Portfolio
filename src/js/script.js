// Update src/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Check auth status
    checkAuthStatus();
    
    // Load projects from localStorage
    loadProjects();
    
    // Add logout event listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('admin');
            checkAuthStatus();
            alert('Logged out successfully');
        });
    }
});

// Update UI based on authentication status
function checkAuthStatus() {
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

// Load projects from localStorage and display on portfolio page
function loadProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return; // Not on projects page
    
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
        const projects = JSON.parse(savedProjects);
        
        // Get the section title element (h2)
        const sectionTitle = projectsSection.querySelector('h2');
        
        // Clear existing projects, but keep the section title
        projectsSection.innerHTML = '';
        if (sectionTitle) {
            projectsSection.appendChild(sectionTitle);
        } else {
            // Recreate section title if it doesn't exist
            const newSectionTitle = document.createElement('h2');
            newSectionTitle.className = 'section-title';
            newSectionTitle.textContent = 'Projects';
            projectsSection.appendChild(newSectionTitle);
        }
        
        // Add all projects from localStorage
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.dataset.title = project.title;
            projectElement.dataset.date = project.date;
            
            projectElement.innerHTML = `
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <span class="date">${project.date}</span>
                </div>
                <div class="project-content">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title}">` : ''}
                    <p>${project.description}</p>
                </div>
                ${project.url ? `<a class="project-link" href="${project.url}" target="_blank">View Project Code</a>` : ''}
            `;
            
            projectsSection.appendChild(projectElement);
        });
    }
    
    // If there are no saved projects, add default projects
    if (!savedProjects) {
        // Keep default projects that are already in the HTML
    }
}

// Filter projects based on search input
window.filterProjects = function() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const title = project.querySelector('h3').textContent.toLowerCase();
        project.style.display = title.includes(input) ? 'block' : 'none';
    });
}