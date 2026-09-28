const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const project = projects[projectId];

if (project) {
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-subtitle").textContent = project.subtitle;
    document.getElementById("project-tag").textContent = project.tag;
    document.getElementById("project-service").textContent = project.service;
    document.getElementById("project-year").textContent = project.year;

    document.getElementById("project-heading").innerHTML =
    project.heading.replace(
        /\*\*(.*?)\*\*/g,
        '<span class="marker">$1</span>'
    );
    document.getElementById("project-text").textContent = project.text;

    const accordion1 = document.getElementById("accordion-1");
const accordion2 = document.getElementById("accordion-2");

if (project.ACC1heading && project.ACC1text) {

    document.getElementById("project-ACC1heading").textContent = project.ACC1heading;
    document.getElementById("project-ACC1text").textContent = project.ACC1text;

} else {

    accordion1.style.display = "none";

}


if (project.ACC2heading && project.ACC2text) {

    document.getElementById("project-ACC2heading").textContent = project.ACC2heading;
    document.getElementById("project-ACC2text").textContent = project.ACC2text;

} else {

    accordion2.style.display = "none";

}




    const imagesContainer = document.getElementById("project-images");

    let imgCounter = 1;

    project.images.forEach((item) => {
        if (Array.isArray(item)) {
            // --- DOS IMÁGENES EN UNA FILA ---
            const row = document.createElement("div");
            row.className = "images-row";

            item.forEach((imageSrc) => {

    const column = document.createElement("div");
    column.className = "image-column";

    if (imageSrc) {

        const img = document.createElement("img");

        img.src = imageSrc;

        img.alt = `${project.title} — imagen ${imgCounter}`;

        imgCounter++;

        column.appendChild(img);
    }

    row.appendChild(column);

});

            imagesContainer.appendChild(row);

        } else {
            // --- UNA IMAGEN EN ANCHO COMPLETO ---
            const img = document.createElement("img");
            img.src = item;
            img.alt = `${project.title} — imagen ${imgCounter}`;
            imgCounter++;

            imagesContainer.appendChild(img);
        }
    });

}