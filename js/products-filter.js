// products-filter.js
// Simple category filter for Products page

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const categories = document.querySelectorAll('.product-category');

  if (!filterButtons.length || !categories.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-category');

      // active class change
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // show/hide sections
      categories.forEach(section => {
        const cat = section.getAttribute('data-category');

        if (selected === 'all' || selected === cat) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });

      // scroll to first visible section
      const firstVisible = Array.from(categories).find(sec => sec.style.display !== 'none');
      if (firstVisible) {
        const offsetTop = firstVisible.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
});
