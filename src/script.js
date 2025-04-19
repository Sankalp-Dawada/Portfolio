document.getElementById("projectForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("http://localhost:5000/api/upload", {
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

    document.getElementById("newProjectPreview").innerHTML = projectHTML;
});


function filterProjects() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const title = project.getAttribute('data-title').toLowerCase();
        project.style.display = title.includes(input) ? 'block' : 'none';
    });
}