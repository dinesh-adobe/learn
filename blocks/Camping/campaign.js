export default function decorate(block) {

  const row = block.querySelector(':scope > div');

  if (!row) return;

  const cols = [...row.children];

  const imageCell = cols[0];
  const title = cols[1];
  const description = cols[2];
  const link = cols[3];

  /* extract picture */

  const picture = imageCell.querySelector('picture');

  /* create columns */

  const imageCol = document.createElement('div');
  imageCol.className = 'camping-image';

  const contentCol = document.createElement('div');
  contentCol.className = 'camping-content';

  if (picture) {
    imageCol.append(picture);
  }

  /* featured label */

  const label = document.createElement('span');
  label.className = 'camping-label';
  label.textContent = 'Featured Article';

  contentCol.append(label);

  if (title) contentCol.append(title);
  if (description) contentCol.append(description);
  if (link) contentCol.append(link);

  /* rebuild layout */

  row.innerHTML = '';
  row.append(imageCol, contentCol);

}