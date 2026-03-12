export default function decorate(block) {

  const rows = [...block.children];

  const grid = document.createElement('div');
  grid.className = 'trips-grid';

  rows.forEach((row) => {

    const cols = [...row.children];

    if (cols.length < 3) return;

    const image = cols[0];
    const title = cols[1];
    const desc = cols[2];

    const card = document.createElement('div');
    card.className = 'trips-card';

    const heading = title.querySelector('a') || title;
    const h3 = document.createElement('h3');
    h3.textContent = heading.textContent;

    card.append(image);
    card.append(h3);
    card.append(desc);

    grid.append(card);

  });

  block.innerHTML = '';
  block.append(grid);

}