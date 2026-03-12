export default function decorate(block) {

  const rows = [...block.children];

  const header = rows[0];
  const textRow = rows[1];
  const imageRow = rows[2];

  const textCols = [...textRow.children];
  const imageCols = [...imageRow.children];

  /* divider */

  const divider = document.createElement('div');
  divider.className = 'member-divider';
  header.after(divider);

  /* cards container */

  const cardContainer = document.createElement('div');
  cardContainer.className = 'member-cards';

  textCols.forEach((text, i) => {

    const image = imageCols[i];

    const card = document.createElement('div');
    card.className = 'member-card';

    const lock = document.createElement('span');
    lock.className = 'member-lock';
    lock.textContent = '🔒';

    const readMore = text.querySelector("p:last-child");
    if (readMore) readMore.className = "member-read";

    card.append(lock);
    card.append(text);
    card.append(image);

    cardContainer.append(card);

  });

  textRow.remove();
  imageRow.remove();

  block.append(cardContainer);

}