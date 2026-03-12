export default function decorate(block) {

  const row = block.querySelector(':scope > div');
  const cols = [...row.children];

  const image = cols[0];
  const title = cols[1];
  const description = cols[2];
  const link = cols[3];

  const panel = document.createElement('div');
  panel.className = 'campaign-content';

  const label = document.createElement('p');
  label.className = 'campaign-label';
  label.textContent = 'Featured Article';

  const button = document.createElement('a');
  const linkElement = link.querySelector('a');

  button.href = linkElement?.href || '#';
  button.textContent = linkElement?.textContent || 'FULL ARTICLE';
  button.className = 'campaign-button';

  panel.append(label, title, description, button);

  row.innerHTML = '';
  row.append(image, panel);

}