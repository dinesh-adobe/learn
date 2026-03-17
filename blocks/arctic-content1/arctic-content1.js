export default function decorate(block) {
  // Wrap each <p> that contains a <picture> in a figure
  // for better semantic structure and alignment control
  block.querySelectorAll('p').forEach((p) => {
    const picture = p.querySelector('picture');
    if (!picture) return;

    // Move picture out of <p> into a <figure>
    const figure = document.createElement('figure');
    figure.classList.add('article-image');
    picture.parentNode.insertBefore(figure, p);
    figure.appendChild(picture);

    // Remove the now-empty <p>
    if (!p.textContent.trim()) p.remove();
  });
}
