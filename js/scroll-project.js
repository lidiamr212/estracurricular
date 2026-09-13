document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('project-counter');
  const yearElement = document.getElementById('project-year');
  const projects = document.querySelectorAll('.project');
  
  if (!counterElement || projects.length === 0) return;

  // Calculamos 3 elementos por fila en escritorio o 1 en dispositivos móviles
  const getItemsPerRow = () => (window.innerWidth >= 1024 ? 3 : 1);

  const observerOptions = {
    root: null,
    // Punto de activación cuando el proyecto cruza la parte superior/media de la pantalla
    rootMargin: '-10% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const currentIndex = parseInt(target.dataset.index, 10);
        const currentYear = target.dataset.year;
        const itemsPerRow = getItemsPerRow();

        // 1. Cambiar el Año
        if (yearElement && currentYear) {
          yearElement.textContent = currentYear;
        }

        // 2. Calcular y cambiar el Rango de Paginación (1-3, 4-6...)
        const startItem = Math.floor((currentIndex - 1) / itemsPerRow) * itemsPerRow + 1;
        const endItem = Math.min(startItem + itemsPerRow - 1, projects.length);

        counterElement.textContent = `${startItem}-${endItem}`;
      }
    });
  }, observerOptions);

  projects.forEach(project => observer.observe(project));
});