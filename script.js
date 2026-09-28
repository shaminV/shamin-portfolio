document.getElementById('year')?.append(new Date().getFullYear());

const menu = document.getElementById('mainNav');
document.getElementById('menuToggle')?.addEventListener('click', () => menu?.classList.toggle('open'));
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contact form -> mailto
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const business = (data.get('business') || '').toString().trim();
  const subject = (data.get('subject') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business || 'N/A'}`,
    '',
    'Message:',
    message
  ].join('\n');

  const mailto = `mailto:shaminvihanga328@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

// Matrix-style animated background
(function matrixBackground() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let columns = 0;
  let drops = [];
  const fontSize = 16;
  const chars = '01アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*';

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * height / fontSize);
  }

  let lastFrame = 0;
  const frameInterval = 85; // larger value = slower matrix animation

  function draw(timestamp = 0) {
    if (timestamp - lastFrame >= frameInterval) {
      lastFrame = timestamp;
      ctx.fillStyle = 'rgba(2, 4, 6, 0.13)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = i % 6 === 0 ? 'rgba(112, 212, 255, 0.50)' : 'rgba(89, 255, 47, 0.55)';
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.982) drops[i] = 0;
        drops[i] += 0.55;
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
})();

// Light 3D tilt effect for cards
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
