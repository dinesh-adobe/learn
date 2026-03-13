export default function decorate(block) {
  const rows = [...block.children];

  /* =============================
  FEATURED ARTICLE
  ============================= */

  const featured = rows[0];

  featured.classList.add('magazine-featured');

  /* =============================
  ALL ARTICLES
  ============================= */

  const grid = document.createElement('div');
  grid.className = 'magazine-grid';

  rows.slice(1).forEach((row) => {
    const cols = [...row.children];

    const image = cols[0];
    const title = cols[1];
    const desc = cols[2];

    const card = document.createElement('div');
    card.className = 'magazine-card';

    const img = image.querySelector('img');

    const cardTitle = document.createElement('div');
    cardTitle.className = 'magazine-card-title';
    cardTitle.innerHTML = title.innerHTML;

    const cardDesc = document.createElement('div');
    cardDesc.className = 'magazine-card-desc';
    cardDesc.innerHTML = desc.innerHTML;

    card.append(img, cardTitle, cardDesc);

    grid.append(card);

    row.remove();
  });

  const title = document.createElement('h2');
  title.textContent = 'All Articles';
  title.className = 'magazine-title';

  block.append(title);
  block.append(grid);
}
