const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navLinks = Array.from(document.querySelectorAll('.section-nav a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const activeLink = navLinks.find((link) => link.getAttribute('href') === id);
        if (!activeLink) return;
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0.1,
    }
  );
  sections.forEach((section) => observer.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
