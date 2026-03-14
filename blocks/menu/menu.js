export default function decorate(block) {
  const rows = Array.from(block.children);
  const menuList = document.createElement('div');
  menuList.className = 'menu-list';

  rows.forEach((row, index) => {
    // Skip first row (usually heading)
    if (index === 0) return;

    const cell = row.querySelector('div');
    if (!cell) return;

    const elements = Array.from(cell.children);

    // Need at least label + value
    if (elements.length < 2) return;

    const label = elements[0].textContent.trim();
    const value = elements[1].textContent.trim();

    const item = document.createElement('div');
    item.className = 'menu-item';

    const labelDiv = document.createElement('div');
    labelDiv.className = 'menu-label';
    labelDiv.textContent = label;

    const valueDiv = document.createElement('div');
    valueDiv.className = 'menu-value';
    valueDiv.textContent = value;

    item.appendChild(labelDiv);
    item.appendChild(valueDiv);

    menuList.appendChild(item);
  });

  // Clear block safely
  block.innerHTML = '';
  block.appendChild(menuList);
}
