document.addEventListener('DOMContentLoaded', () => {
  const headers = document.querySelectorAll('.accordion-header');

  // --- PASO NUEVO: Desplegar los que tengan la clase .active al cargar la página ---
  document.querySelectorAll('.accordion-item.active').forEach(item => {
    const content = item.querySelector('.accordion-content');
    if (content) {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // --- LÓGICA DE CLIC (mantiene solo uno abierto al interactuar) ---
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const currentContent = header.nextElementSibling;
      const isOpen = currentItem.classList.contains('active');

      // 1. Cerrar todos
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
      });

      // 2. Abrir solo el seleccionado
      if (!isOpen) {
        currentItem.classList.add('active');
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
      }
    });
  });
});