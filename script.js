// The page works without JavaScript; this marks the current in-page section.
const sectionLinks = [...document.querySelectorAll('nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
   sectionLinks.forEach(link => {
    if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
   });
  }
 }, {rootMargin: '-15% 0px -45% 0px'});
 document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
