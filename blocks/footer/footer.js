import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates footer fragment
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Fetch the footer path from metadata, or default to /footer
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  // Load the fragment
  const fragment = await loadFragment(footerPath);

  // Clear the placeholder content
  block.textContent = '';
  const footer = document.createElement('div');

  // Append all children from the loaded fragment document
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  block.append(footer);

  // Ensure icons requested via :icon: syntax are loaded correctly
  footer.querySelectorAll('.icon img').forEach((img) => {
    const name = img.dataset.iconName;
    if (name) {
      img.src = `/icons/${name}.svg`;
    }
  });
}