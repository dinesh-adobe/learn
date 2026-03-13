export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  const content = row.children[1];

  const label = document.createElement('p');
  label.className = 'page1-featured-label';
  label.textContent = 'Featured Article';

  content.prepend(label);
}
