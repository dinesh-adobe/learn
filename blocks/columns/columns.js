export default function decorate(block) {

  const cards = block.querySelectorAll(':scope > div');

  cards.forEach((card) => {

    /* Convert button titles to headings */

    const button = card.querySelector('.button-wrapper a');

    if (button) {

      const title = document.createElement('h6');
      const link = document.createElement('a');

      link.href = button.href;
      link.textContent = button.textContent;

      title.append(link);

      button.closest('.button-wrapper').replaceWith(title);

    }

    /* Make entire card clickable */

    const link =
      card.querySelector('h6 a') ||
      card.querySelector('.button-wrapper a');

    if (!link) return;

    const url = link.href;

    card.addEventListener('click', () => {
      window.location.href = url;
    });

    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.location.href = url;
      }
    });

  });

}