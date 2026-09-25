// Native disclosure elements remain usable without JavaScript.
document.querySelectorAll('.arrival-details details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.arrival-details details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const galleryLinks = [...document.querySelectorAll('.gallery-link')];
const viewer = document.querySelector('.lightbox');
if (viewer && typeof viewer.showModal === 'function') {
  let current = 0;
  let trigger;
  const picture = viewer.querySelector('img');
  const caption = viewer.querySelector('.lightbox-caption');
  function showPicture(index) {
    current = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[current];
    picture.src = link.href;
    picture.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
  }
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      trigger = link;
      showPicture(index);
      viewer.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  viewer.querySelector('.lightbox-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.previous').addEventListener('click', () => showPicture(current - 1));
  viewer.querySelector('.next').addEventListener('click', () => showPicture(current + 1));
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showPicture(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPicture(current - 1); }
  });
  viewer.addEventListener('click', (event) => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => { document.body.style.overflow = ''; trigger?.focus(); });
}
