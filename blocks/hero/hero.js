export default function decorate(block) {
  const container = block.querySelector(':scope > div > div');

  const h2 = container.querySelector('h2');
  const paragraph = h2.nextElementSibling;

  if (!h2 || !paragraph) return;

  const card = document.createElement('div');
  card.className = 'hero-content';

  card.appendChild(h2);
  card.appendChild(paragraph);

  block.appendChild(card);
}
