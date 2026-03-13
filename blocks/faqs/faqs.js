export default function decorate(block) {

  const row = block.querySelector(':scope > div');
  if (!row) return;

  const left = row.children[0];
  const right = row.children[1];

  if (!left || !right) return;

  const image = left.querySelector('picture');
  const title = left.querySelector('h1');

  const text = right.querySelector('h2, p');

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'faq-wrapper';

  if (title) wrapper.append(title);
  if (image) wrapper.append(image);
  if (text) wrapper.append(text);

  block.append(wrapper);
}