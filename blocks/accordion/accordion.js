export default function decorate(block) {

  const rows = [...block.querySelectorAll(':scope > div')];

  rows.forEach((row, index) => {

    const label = row.children[0];
    const body = row.children[1];

    if (!label || !body) return;

    /* Create summary */
    const summary = document.createElement('summary');
    summary.classList.add('accordion-item-label');
    summary.innerHTML = label.innerHTML;

    /* Style body */
    body.classList.add('accordion-item-body');

    /* Create details element */
    const details = document.createElement('details');
    details.classList.add('accordion-item');

    details.append(summary, body);

    /* Replace original row */
    row.replaceWith(details);

    /* Open first accordion item */
    if (index === 0) {
      details.open = true;
    }

    /* Allow only one open item */
    details.addEventListener('toggle', () => {
      if (details.open) {
        block.querySelectorAll('.accordion-item').forEach((item) => {
          if (item !== details) item.open = false;
        });
      }
    });

  });
}