




// tag 


const hero = document.querySelector('.heroContent') || document.querySelector('.hero');
const container = document.querySelector('.trail-container');
const activarTags = document.querySelectorAll('.activarTag');
const isDesk = window.matchMedia('(min-width: 650px)').matches;

const tags = [
  'Libro', 'Revista', 'Página web', 'Cartel',
  'Banner', 'Fanzine', 'Packaging', 'Newsletter',
  'Ilustración', 'Infografía', 'Presentación',
  'Señalética', 'Folleto', 'Identidad visual',
  'Motion graphics', 'Catálogo', 'Redes sociales',
  'Material didáctico', 'Mupi', 'Vinilo',
  'Landing page', 'Editorial', 'Merchandising',
  'Tarjeta de visita', 'Calendario', 'Etiqueta',
  'Branding', 'Logo', 'Cartel',
  'Manual de identidad', 'Dosier', 'Mapa',
  'Expositor', 'Rótulo', 'Portada',
  'Vídeo promocional', 'App', 'Mural',
  'Newsletter', 'Campaña gráfica'
];

let tagIndex = 0;
let active = false;
let animationId = null;

// Activar y desactivar al pulsar .activarTag
activarTags.forEach(elemento => {
  elemento.addEventListener('click', () => {
    if (active) {
      stopTrail();
    } else {
      startTrail();
    }
  });
});

function startTrail() {
  if (!hero || !container || active) return;

  active = true;

  if (isDesk) {
    hero.addEventListener('mousemove', desktopTrail);
  } else {
    startMobileZigzagTrail();
  }
}

function stopTrail() {
  active = false;

  if (hero) {
    hero.removeEventListener('mousemove', desktopTrail);
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  // Eliminar etiquetas que sigan visibles
  container.innerHTML = '';
}

// ESCRITORIO: seguimiento del ratón
let lastX = 0;
let lastY = 0;
const threshold = 150;

function desktopTrail(e) {
  const currentX = e.clientX;
  const currentY = e.clientY;

  const distance = Math.hypot(
    currentX - lastX,
    currentY - lastY
  );

  if (distance > threshold) {
    createTrailTag(currentX, currentY, tags[tagIndex]);

    tagIndex = (tagIndex + 1) % tags.length;

    lastX = currentX;
    lastY = currentY;
  }
}

// CREAR ETIQUETAS
function createTrailTag(x, y, text) {
  const el = document.createElement('div');

  el.classList.add('trail-tag');
  el.innerText = text;

  const rect = hero.getBoundingClientRect();

  el.style.left = `${x - rect.left}px`;
  el.style.top = `${y - rect.top}px`;

  container.appendChild(el);

  el.addEventListener('animationend', () => {
    el.remove();
  });
}

// MÓVIL: recorrido automático en zigzag
function startMobileZigzagTrail() {
  let progress = 0;
  let lastX = 0;
  let lastY = 0;

  let noiseSeedX = Math.random() * 100;
  let noiseSeedY = Math.random() * 100;

  function animate() {
    if (!active) return;

    const rect = hero.getBoundingClientRect();

    const width = rect.width * 0.75;
    const height = rect.height * 0.75;
    const offsetX = rect.width * 0.12;
    const offsetY = rect.height * 0.12;

    const speed = 0.006 + Math.sin(progress * 0.5) * 0.003;
    progress += speed;

    const baseWaveX =
      Math.sin(progress * 2.7) * 0.6 +
      Math.cos(progress * 0.9) * 0.4;

    const baseWaveY =
      Math.cos(progress * 1.8) * 0.5 +
      Math.sin(progress * 3.3) * 0.5;

    const chaosX = Math.sin(progress * 5 + noiseSeedX) * 0.15;
    const chaosY = Math.cos(progress * 4 + noiseSeedY) * 0.15;

    const posX = (baseWaveX + chaosX + 1) / 2;
    const posY = (baseWaveY + chaosY + 1) / 2;

    const currentX = offsetX + posX * width;
    const currentY = offsetY + posY * height;

    const distance = Math.hypot(
      currentX - lastX,
      currentY - lastY
    );

    const dynamicThreshold = 99 + Math.sin(progress * 3) * 25;

    if (distance > dynamicThreshold) {
      createTrailTag(
        rect.left + currentX,
        rect.top + currentY,
        tags[tagIndex]
      );

      tagIndex = (tagIndex + 1) % tags.length;

      lastX = currentX;
      lastY = currentY;
    }

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);
}








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