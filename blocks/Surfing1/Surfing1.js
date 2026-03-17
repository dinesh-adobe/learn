export default function decorate(block) {
  // Collect all slides
  const slides = [...block.children];
  const total = slides.length;
  if (total === 0) return;

  // Build carousel wrapper
  const carousel = document.createElement('div');
  carousel.classList.add('carousel-track-wrapper');

  const track = document.createElement('div');
  track.classList.add('carousel-track');

  // Build each slide
  slides.forEach((row, i) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    if (i === 0) slide.classList.add('active');

    // Move picture into slide
    const picture = row.querySelector('picture');
    if (picture) slide.appendChild(picture);

    track.appendChild(slide);
    row.remove();
  });

  carousel.appendChild(track);
  block.appendChild(carousel);

  // --- Dots ---
  const dotsWrapper = document.createElement('div');
  dotsWrapper.classList.add('carousel-dots');
  for (let i = 0; i < total; i += 1) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrapper.appendChild(dot);
  }

  // --- Arrows ---
  const arrowsWrapper = document.createElement('div');
  arrowsWrapper.classList.add('carousel-arrows');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-arrow', 'carousel-prev');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '&#8592;'; // ←

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-arrow', 'carousel-next');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '&#8594;'; // →

  arrowsWrapper.appendChild(prevBtn);
  arrowsWrapper.appendChild(nextBtn);

  // --- Controls bar (dots left, arrows right) ---
  const controls = document.createElement('div');
  controls.classList.add('carousel-controls');
  controls.appendChild(dotsWrapper);
  controls.appendChild(arrowsWrapper);
  block.appendChild(controls);

  // --- State ---
  let current = 0;
  let autoplayTimer = null;

  function goTo(index) {
    const allSlides = track.querySelectorAll('.carousel-slide');
    const allDots = dotsWrapper.querySelectorAll('.carousel-dot');

    allSlides[current].classList.remove('active');
    allDots[current].classList.remove('active');

    current = (index + total) % total;

    allSlides[current].classList.add('active');
    allDots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  // --- Autoplay ---
  function startAutoplay() {
    autoplayTimer = setInterval(next, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();

  // --- Touch / swipe support ---
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
      resetAutoplay();
    }
  }, { passive: true });

  // --- Keyboard ---
  block.setAttribute('tabindex', '0');
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
    if (e.key === 'ArrowLeft')  { prev(); resetAutoplay(); }
  });
}