// Native anchor links keep navigation usable without JavaScript.
// Indicate the current section to assistive technologies as it enters view.
const sectionLinks = [...document.querySelectorAll('.header nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of sectionLinks) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-10% 0px -45% 0px' });
  for (const link of sectionLinks) {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  }
}
