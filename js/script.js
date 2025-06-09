// Array of birthday messages and corresponding emojis for the cards
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
  "🎉", "✨", "💖", "🌌", "😁", "🎁", "🤗", "🌠", "🕺"
];

const grid = document.getElementById("cards-container");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const backgroundMusic = document.getElementById('backgroundMusic'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#ff0", "#f0f", "#0ff", "#f00", "#0f0", "#00f", "#fff", "#ff8c00", "#8a2be2"];
let activeParticles = [];

function createExplosion(x, y) {
  for (let i = 0; i < 80; i++) {
      activeParticles.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
          radius: Math.random() * 3 + 1,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
      });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  activeParticles = activeParticles.filter(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.02;

      if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}`;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          return true;
      }
      return false;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

let isCardClicked = false;

function generateModalLights() {
  const modalLightsContainer = document.getElementById('modalLights');
  modalLightsContainer.innerHTML = '';
  const numberOfLights = 40;

  for (let i = 0; i < numberOfLights; i++) {
      const span = document.createElement('span');
      const x = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = 5 + Math.random() * 5;
      span.style.left = `${x}%`;
      span.style.animationDelay = `${delay}s`;
      span.style.animationDuration = `${duration}s`;
      modalLightsContainer.appendChild(span);
  }
}

function mostrarModal(message) {
  generateModalLights();
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('miModal').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('miModal').style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onclick = function(event) {
  const modal = document.getElementById('miModal');
  if (event.target === modal) {
      cerrarModal();
  }
}

messages.forEach((msg, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = emojis[index];

  card.addEventListener("click", () => {
      if (backgroundMusic.paused) {
      backgroundMusic.play().catch(e => console.error("Error al intentar reproducir música:", e));
      }
      if (isCardClicked) return;
      isCardClicked = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
          setTimeout(() => {
              const x = Math.random() * canvas.width;
              const y = Math.random() * canvas.height * 0.7;
              createExplosion(x, y);
          }, i * 200);
      }

      setTimeout(() => {
          mostrarModal(msg);
          isCardClicked = false;
      }, 700);
  });
  grid.appendChild(card);
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

animateFireworks();
