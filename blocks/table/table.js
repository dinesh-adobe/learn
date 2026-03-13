export default async function decorate(block) {
  // Find the JSON link inside the block
  const link = block.querySelector('a');

  if (!link) {
    block.innerHTML = '<p>No JSON URL found</p>';
    return;
  }

  const jsonUrl = link.href;

  try {
    // Fetch JSON
    const response = await fetch(jsonUrl);
    const data = await response.json();

    // AEM sheet json structure
    const rows = data.data;

    if (!rows || rows.length === 0) {
      block.innerHTML = '<p>No data found</p>';
      return;
    }

    // Create table
    const table = document.createElement('table');

    // Header
    const headerRow = document.createElement('tr');
    Object.keys(rows[0]).forEach((key) => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });

    const thead = document.createElement('thead');
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');

    rows.forEach((row) => {
      const tr = document.createElement('tr');

      Object.values(row).forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Clear block and append table
    block.innerHTML = '';
    block.appendChild(table);
  } catch (error) {
    console.error('Error loading JSON:', error);
    block.innerHTML = '<p>Failed to load data</p>';
  }
}
