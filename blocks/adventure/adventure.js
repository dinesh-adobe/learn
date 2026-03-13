export default function decorate(block) {

  const row = block.querySelector(':scope > div');
  const cols = [...row.children];

  const image = cols[0];
  const title = cols[1];
  const desc = cols[2];
  const link = cols[3];

  /* image wrapper */

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'adventure-image';

  imageWrapper.append(image);

  /* content card */

  const content = document.createElement('div');
  content.className = 'adventure-content';

  content.append(title, desc, link);

  /* rebuild */
  block.innerHTML = '';
  block.append(imageWrapper, content);

}