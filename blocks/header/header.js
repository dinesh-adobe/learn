import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;

  sections
    .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded =
    forceExpanded !== null
      ? !forceExpanded
      : nav.getAttribute('aria-expanded') === 'true';

  const button = nav.querySelector('.nav-hamburger button');

  document.body.style.overflowY =
    expanded || isDesktop.matches ? '' : 'hidden';

  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');

  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? 'false' : 'true'
  );

  button.setAttribute(
    'aria-label',
    expanded ? 'Open navigation' : 'Close navigation'
  );
}

export default async function decorate(block) {

  /* =====================
     LOAD NAV FRAGMENT
  ====================== */

  const navMeta = getMetadata('nav');
  const navPath = navMeta
    ? new URL(navMeta, window.location).pathname
    : '/nav';

  const fragment = await loadFragment(navPath);

  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  /* =====================
     ADD SECTION CLASSES
  ====================== */

  const classes = ['brand', 'sections', 'tools'];

  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navSections = nav.querySelector('.nav-sections');

  /* =====================
     NAV SECTION DROPDOWN
  ====================== */

  if (navSections) {
    navSections
      .querySelectorAll(':scope .default-content-wrapper > ul > li')
      .forEach((navSection) => {

        if (navSection.querySelector('ul')) {
          navSection.classList.add('nav-drop');
        }

        navSection.addEventListener('click', () => {

          if (isDesktop.matches) {

            const expanded =
              navSection.getAttribute('aria-expanded') === 'true';

            toggleAllNavSections(navSections);

            navSection.setAttribute(
              'aria-expanded',
              expanded ? 'false' : 'true'
            );
          }
        });
      });
  }

  /* =====================
     HAMBURGER
  ====================== */

  const hamburger = document.createElement('div');

  hamburger.classList.add('nav-hamburger');

  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;

  hamburger.addEventListener('click', () =>
    toggleMenu(nav, navSections)
  );

  nav.prepend(hamburger);

  nav.setAttribute('aria-expanded', 'false');

  toggleMenu(nav, navSections, isDesktop.matches);

  isDesktop.addEventListener('change', () =>
    toggleMenu(nav, navSections, isDesktop.matches)
  );

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
      navWrapper.classList.add('scrolled');   // FIXED
    } else {
      navWrapper.classList.remove('scrolled'); // FIXED
    }

  });

}