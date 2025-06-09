// Array de mensajes de cumpleaños y emojis correspondientes para las tarjetas
const messages = [
  "¡Que este nuevo año de vida esté lleno de momentos inolvidables, alegría desbordante y mucho amor! Que todos tus sueños más anhelados se hagan realidad.",
  "Hoy celebramos tu existencia, tu luz, tu bondad y la alegría que irradias. Gracias por ser una persona tan maravillosa y por cada momento que compartimos. ¡Felicidades!",
  "Este es un día especial para una persona verdaderamente inolvidable. Que la felicidad te siga a cada paso y que cada instante sea un tesoro de momentos felices.",
  "Hoy, el universo entero se une en un coro de alegría para celebrar tu vida. Que la energía positiva te envuelva y te guíe hacia un futuro lleno de éxitos y prosperidad.",
  "Sonríe con todo tu corazón, porque hoy es tu día, un día para celebrar la vida que has construido y la que está por venir. ¡Muchísimas felicidades en tu cumpleaños!",
  "¡Que cada deseo que pidas con el alma se convierta en una hermosa realidad! Que este nuevo ciclo te traiga infinitas bendiciones y oportunidades para crecer.",
  "Abraza fuerte a quienes tienes cerca, siente el cariño y la felicidad que te rodea. Que el amor y la amistad sean siempre tus mejores compañeros en esta hermosa jornada.",
  "Cierra los ojos por un instante y pide tu deseo más profundo. Concéntrate en él, porque el poder de tus sueños es inmenso y este es el día perfecto para que se manifiesten.",
  "¡Es hora de saltar de felicidad, gritar de alegría y celebrar la vida con cada fibra de tu ser durante al menos 5 segundos! Que tu energía contagie a todos a tu alrededor."
];
const emojis = [
  "🎉", "✨", "💖", "🌌", "😁", "🎁", "🤗", "�", "🕺"
];

// Obtener elementos del DOM para la cuadrícula y el lienzo de fuegos artificiales
const grid = document.getElementById("cards-container");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// --- Sección para manejar la música de fondo en JavaScript ---
const backgroundMusic = document.createElement('audio'); // Crea el elemento <audio>
backgroundMusic.loop = true; // Hace que la música se repita
// Define la URL de tu archivo de música
// ¡Importante! Asegúrate de que esta URL sea accesible y el archivo MP3 sea válido.
backgroundMusic.src = "https://tempfile.aiquickdraw.com/s/98c16df768d443d689c8efa20b401c02.mp3";
document.body.appendChild(backgroundMusic); // Añade el elemento al cuerpo del documento

// **NUEVA FUNCIONALIDAD: Control de reproducción según la visibilidad de la página**
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
      // La página está oculta (el usuario se ha ido a otra pestaña/app)
      backgroundMusic.pause();
  } else {
      // La página está visible de nuevo (el usuario ha vuelto)
      // Intentar reproducir la música, manejando la política de navegadores
      if (backgroundMusic.paused) {
          backgroundMusic.play().catch(e => console.error("Error al reanudar la música:", e));
      }
  }
});

// Establecer las dimensiones del lienzo para que coincidan con el tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Definir una paleta de colores para las partículas de fuegos artificiales
const colors = ["#ff0", "#f0f", "#0ff", "#f00", "#0f0", "#00f", "#fff", "#ff8c00", "#8a2be2"];

// Array global para mantener un registro de todas las partículas activas
let activeParticles = [];

/**
* Crea un efecto de explosión de fuegos artificiales en una coordenada dada.
* Añade nuevas partículas al array global activeParticles.
* @param {number} x - La coordenada x para el origen de la explosión.
* @param {number} y - La coordenada y para el origen de la explosión.
*/
function createExplosion(x, y) {
  // Generar 80 partículas para cada explosión
  for (let i = 0; i < 80; i++) {
      activeParticles.push({
          x,
          y,
          // Componentes de velocidad aleatorios para que las partículas se dispersen
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
          radius: Math.random() * 3 + 1, // Tamaño aleatorio para cada partícula
          alpha: 1, // Opacidad inicial (completamente visible)
          color: colors[Math.floor(Math.random() * colors.length)] // Asignar un color aleatorio
      });
  }
}

/**
* Bucle principal de animación para dibujar y actualizar todas las partículas de fuegos artificiales.
* Utiliza requestAnimationFrame para animaciones más suaves.
*/
function animateFireworks() {
  // Limpiar completamente todo el lienzo en cada fotograma para evitar que los rastros se oscurezcan acumulativamente
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Actualizar la posición, desvanecer y dibujar cada partícula
  activeParticles = activeParticles.filter(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.02; // Reducir gradualmente la opacidad para que las partículas se desvanezcan

      // Dibujar la partícula si todavía está visible
      if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); // Dibujar un círculo para cada partícula
          ctx.fillStyle = `${p.color}`;
          ctx.globalAlpha = p.alpha; // Aplicar la opacidad actual de la partícula
          ctx.fill();
          return true; // Mantener la partícula en el array si todavía está visible
      }
      return false; // Eliminar la partícula del array si se ha desvanecido
  });
  ctx.globalAlpha = 1; // Restablecer la opacidad global para el siguiente fotograma

  // Continuar el bucle de animación
  requestAnimationFrame(animateFireworks);
}

// Bandera para evitar múltiples clics rápidos en las tarjetas
let isCardClicked = false;

/**
* Genera y añade partículas de luz animadas al fondo del modal.
*/
function generateModalLights() {
  const modalLightsContainer = document.getElementById('modalLights');
  // Limpiar cualquier luz existente para evitar que se acumulen cada vez que se abre el modal
  modalLightsContainer.innerHTML = '';
  const numberOfLights = 40; // Puedes ajustar la densidad de luces aquí

  for (let i = 0; i < numberOfLights; i++) {
      const span = document.createElement('span');
      const x = Math.random() * 100; // Posición horizontal aleatoria (0-100% del ancho del modal)
      const delay = Math.random() * 8; // Retraso aleatorio antes de que comience la animación
      const duration = 5 + Math.random() * 5; // Duración de animación aleatoria para variedad
      span.style.left = `${x}%`;
      span.style.animationDelay = `${delay}s`;
      span.style.animationDuration = `${duration}s`; // Aplicar duración aleatoria a la animación CSS
      modalLightsContainer.appendChild(span);
  }
}

/**
* Muestra el modal con el mensaje especificado.
* También dispara la generación de luces animadas dentro del modal.
* @param {string} message - El mensaje de cumpleaños a mostrar en el modal.
*/
function mostrarModal(message) {
  generateModalLights(); // Generar nuevas luces para el fondo del modal
  document.getElementById('modalMessage').textContent = message; // Establecer el texto del mensaje
  document.getElementById('miModal').style.display = 'flex'; // Mostrar el modal usando flexbox para centrarlo
}

/**
* Oculta el modal y limpia el lienzo.
*/
function cerrarModal() {
  document.getElementById('miModal').style.display = 'none';
  // Limpiar el lienzo cuando el modal se cierra para eliminar cualquier efecto de fuegos artificiales persistente
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Detector de eventos para cerrar el modal al hacer clic fuera de su contenido
window.onclick = function(event) {
  const modal = document.getElementById('miModal');
  if (event.target === modal) { // Comprobar si el clic ocurrió directamente sobre la superposición del modal
      cerrarModal();
  }
}

// Rellenar la cuadrícula con tarjetas, adjuntando oyentes de clics
messages.forEach((msg, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = emojis[index]; // Mostrar el emoji correspondiente en la tarjeta

  card.addEventListener("click", () => {
      // Intentar reproducir música en la interacción del usuario
      // Los navegadores a menudo requieren un gesto del usuario para reproducir audio.
      // Esto asegura que la música se reproduzca si está en pausa o bloqueada inicialmente.
      if (backgroundMusic.paused) {
          backgroundMusic.play().catch(e => console.error("Error al intentar reproducir música:", e));
      }

      if (isCardClicked) return; // Si ya se ha hecho clic en una tarjeta, ignorar clics subsiguientes
      isCardClicked = true; // Establecer la bandera para evitar clics múltiples

      // Limpiar el lienzo inmediatamente al hacer clic en una tarjeta para asegurar un punto de partida limpio para los nuevos fuegos artificiales
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Disparar la animación de fuegos artificiales en 3 ubicaciones aleatorias
      for (let i = 0; i < 3; i++) {
          setTimeout(() => {
              const x = Math.random() * canvas.width; // Coordenada x aleatoria
              const y = Math.random() * canvas.height * 0.7; // Coordenada y aleatoria en el 70% superior
              createExplosion(x, y);
          }, i * 200); // Espaciar cada explosión por 200ms
      }

      // Mostrar el modal después de un breve retraso para permitir que los fuegos artificiales comiencen a animarse
      setTimeout(() => {
          mostrarModal(msg); // Mostrar el modal con el mensaje
          isCardClicked = false; // Restablecer la bandera una vez que se muestra el modal
      }, 700); // Retraso de 0.7 segundos antes de que aparezca el modal para que los fuegos artificiales sean más visibles
  });
  grid.appendChild(card); // Añadir la tarjeta creada al contenedor de la cuadrícula
});

// Detector de eventos para ajustar el tamaño del lienzo cuando se redimensiona la ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Limpiar el lienzo al redimensionar para evitar distorsiones y asegurar que esté limpio
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Iniciar el bucle principal de animación de fuegos artificiales cuando se carga la página
animateFireworks();
