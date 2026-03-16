export default function decorate(block) {
  // Add "SHARE THIS STORY" heading above the block
  const wrapper = block.closest('.share-story-wrapper');
  if (wrapper) {
    const heading = document.createElement('p');
    heading.classList.add('share-story-heading');
    heading.textContent = 'Share This Story';
    wrapper.prepend(heading);
  }

  // Decorate each row into a story card
  [...block.children].forEach((row) => {
    const inner = row.querySelector('div');
    const paras = inner ? [...inner.querySelectorAll('p')] : [];
    const title = paras[0] ? paras[0].textContent.trim() : '';
    const date  = paras[1] ? paras[1].textContent.trim() : '';

    row.classList.add('story-card');
    row.innerHTML = '';

    if (title) {
      const titleEl = document.createElement('p');
      titleEl.classList.add('story-card-title');
      titleEl.textContent = title;
      row.append(titleEl);
    }

    if (date) {
      const dateEl = document.createElement('p');
      dateEl.classList.add('story-card-date');
      dateEl.textContent = date;
      row.append(dateEl);
    }
  });
}