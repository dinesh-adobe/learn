document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.cars.block > div');

  cards.forEach((card) => {
    const link = card.querySelector('h3 a');

    /* Make entire card clickable */
    if (link) {
      card.style.cursor = 'pointer';

      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          window.open(link.href, '_blank');
        }
      });
    }

    /* Convert rating number to stars */
    const ratingElement = card.querySelector('p strong');

    if (ratingElement && !isNaN(ratingElement.textContent)) {
      const rating = parseFloat(ratingElement.textContent);
      const stars = '★'.repeat(Math.round(rating));

      ratingElement.innerHTML = `${rating} <span style="color:gold">${stars}</span>`;
    }
  });
});
