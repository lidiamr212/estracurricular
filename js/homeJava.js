




//  COPIAR CORREO

const textosCopiar = document.querySelectorAll('.copiar');
const mensaje = document.getElementById('mensaje-copiado');
let temporizador;

textosCopiar.forEach(texto => {
    texto.addEventListener('click', async () => {
        const contenido = texto.dataset.copiar || texto.textContent.trim();

        try {
            await navigator.clipboard.writeText(contenido);

            mensaje.classList.add('visible');
            clearTimeout(temporizador);

            temporizador = setTimeout(() => {
                mensaje.classList.remove('visible');
            }, 1800);

        } catch (error) {
            console.error('No se ha podido copiar el texto:', error);
        }
    });
});



// EFECTO BOTON DE INVITAME A CENAR 

const boton = document.getElementById('telefono');
let clics = 0;

boton.addEventListener('click', () => {
    clics++;

    if (clics === 1) {
        // Primer clic: se sacude y cambia el texto
        boton.classList.remove('shake');
        void boton.offsetWidth;
        boton.classList.add('shake');

        boton.textContent = 'pero primero invítame a cenar :0';

    } else if (clics === 2) {
        // Segundo clic: se convierte en enlace
        const enlace = document.createElement('a');

        enlace.id = 'telefono';
        enlace.className = boton.className;
        enlace.target = '_blank';
        enlace.rel = 'noopener noreferrer';
        enlace.href = 'https://www.thefork.es/restaurante/bernal-a-costa-r854538#booking=';

        // Cambia directamente al texto final
        enlace.textContent = 'nos vemos el sábado ;)';

        boton.replaceWith(enlace);
        
        // Abre el enlace en una pestaña nueva
        window.open(enlace.href, '_blank', 'noopener,noreferrer');
    }
});




// SCROL POR LA PORTADA - CAMBIO DE TEXTO

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




// HOVER DE LAS PORTADAS -  CAMBIO DE IMAGENES

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