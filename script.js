const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confetti = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor() {
  const colors = ['#fde132', '#009bde', '#ff6b00', '#e91e63', '#ff4d4d', '#4d94ff', '#4dff4d', '#ffff4d', '#ff66ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBalloons(count = 10) {
  const container = document.querySelector('.balloon-container');
  for (let i = 0; i < count; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.backgroundColor = randomColor();
    balloon.style.animationDuration = `${8 + Math.random() * 5}s`;
    container.appendChild(balloon);
  }
}

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      radius: Math.random() * 6 + 2,
      color: randomColor(),
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 2 * Math.PI
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();

    c.y += c.speed;
    c.x += Math.sin(c.angle);

    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

let hasStarted = false;

function startConfetti() {
  if (hasStarted) return;
  hasStarted = true;
  createConfetti();
  setInterval(drawConfetti, 20);
  const music = document.getElementById('bg-music');
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
  createBalloons(20);
}

