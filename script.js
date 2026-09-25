// Native links and disclosure elements work without JavaScript.
document.querySelectorAll('.arrival-details details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.arrival-details details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
