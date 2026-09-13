const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const project = projects[projectId];

if (project) {
    document.getElementById("project-cover").src = project.cover;

    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-subtitle").textContent = project.subtitle;
    document.getElementById("project-tag").textContent = project.tag;
    document.getElementById("project-service").textContent = project.service;
    document.getElementById("project-year").textContent = project.year;

    document.getElementById("project-heading").textContent = project.heading;
    document.getElementById("project-text").textContent = project.text;

    document.getElementById("project-ACC1heading").textContent = project.ACC1heading;
    document.getElementById("project-ACC1text").textContent = project.ACC1text;

    document.getElementById("project-ACC2heading").textContent = project.ACC2heading;
    document.getElementById("project-ACC2text").textContent = project.ACC2text;

    const imagesContainer = document.getElementById("project-images");

    project.images.forEach((image, index) => {

        const img = document.createElement("img");

        img.src = image;
        img.alt = `${project.title} — imagen ${index + 1}`;

        imagesContainer.appendChild(img);

    });

}