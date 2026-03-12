export default function decorate(block) {

  const row = block.querySelector(':scope > div');
  const cols = [...row.children];

  const imageCol = cols[0];
  const titleCol = cols[1];
  const descCol = cols[2];
  const linkCol = cols[3];

  /* create content panel */

  const content = document.createElement('div');
  content.className = 'campaign-content';

  const label = document.createElement('p');
  label.className = 'campaign-label';
  label.textContent = 'Featured Article';

  content.append(label, titleCol, descCol, linkCol);

  /* rebuild layout */

  row.innerHTML = '';
  row.append(imageCol, content);

}