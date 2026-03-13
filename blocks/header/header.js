import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function toggleMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');

  if (button) {
    button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  }
}

export default async function decorate(block) {
  /* =====================
     LOAD NAV FRAGMENT
  ====================== */
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  /* =====================
     ASSIGN SEMANTIC CLASSES
  ====================== */
  const classes = ['utility', 'brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const utility = nav.querySelector('.nav-utility');
  const brand = nav.querySelector('.nav-brand');
  const sections = nav.querySelector('.nav-sections');
  const tools = nav.querySelector('.nav-tools');

  /* =====================
     RESTRUCTURE FOR FULL WIDTH
  ====================== */
  nav.innerHTML = ''; // Clear nav to rebuild with rows

  // 1. TOP ROW (Utility Bar - Black)
  const topRow = document.createElement('div');
  topRow.className = 'nav-top-row';
  if (utility) topRow.append(utility);

  // 2. BOTTOM ROW (Main Nav - White)
  const bottomRow = document.createElement('div');
  bottomRow.className = 'nav-bottom-row';
  
  const bottomRowContent = document.createElement('div');
  bottomRowContent.className = 'nav-bottom-row-content';

  // Hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;
  hamburger.addEventListener('click', () => toggleMenu(nav));

  bottomRowContent.append(hamburger);
  if (brand) bottomRowContent.append(brand);
  if (sections) bottomRowContent.append(sections);
  if (tools) bottomRowContent.append(tools);
  
  bottomRow.append(bottomRowContent);

  // Append rows to nav
  nav.append(topRow);
  nav.append(bottomRow);

  nav.setAttribute('aria-expanded', 'false');
  toggleMenu(nav, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, isDesktop.matches));

  /* =====================
     NAV WRAPPER
  ====================== */
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  /* =====================
     SCROLL SHRINK FIX
  ====================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
  });
}