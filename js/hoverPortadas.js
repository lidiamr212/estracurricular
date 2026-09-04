document.addEventListener('DOMContentLoaded', () => {
  // Seleccionamos todas las tarjetas de proyecto
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    // Buscamos la imagen con secuencia dentro de esta tarjeta
    const img = project.querySelector('.hover-sequence');
    if (!img) return; // Si no hay imagen de secuencia, ignora esta tarjeta

    // Leemos los datos configurados en el HTML
    const basePath = img.dataset.basePath;
    const totalFrames = parseInt(img.dataset.totalFrames, 10);
    const extension = img.dataset.extension || '.png';
    
    let intervalId = null;
    let currentFrame = 0;
    const loadedImages = [];

    // 1. PRECARGA: Carga calima-0.png, calima-1.png, calima-2.png...
    for (let i = 0; i < totalFrames; i++) {
      const preloadImg = new Image();
      preloadImg.src = `${basePath}${i}${extension}`;
      loadedImages.push(preloadImg);
    }

    // 2. DETECCIÓN EN EL PADRE: Al entrar con el ratón a la tarjeta entera (.project)
    project.addEventListener('mouseenter', () => {
      intervalId = setInterval(() => {
        currentFrame = (currentFrame + 1) % totalFrames;
        img.src = loadedImages[currentFrame].src;
      }, 900); // Cambia cada 150ms (puedes ajustar la velocidad)
    });

    // 3. Al salir de la tarjeta, detiene la animación y vuelve al frame 0
    project.addEventListener('mouseleave', () => {
      clearInterval(intervalId);
      currentFrame = 0;
      img.src = loadedImages[0].src;
    });
  });
});