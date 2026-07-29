document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      if(!link.classList.contains('text-primary')) {
        link.classList.remove('text-secondary');
        link.classList.add('text-white');
      }
    });
    link.addEventListener('mouseleave', () => {
      if(!link.classList.contains('text-primary')) {
        link.classList.add('text-secondary');
        link.classList.remove('text-white');
      }
    });
  });
});
