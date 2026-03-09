export default function decorate(block) {

  const rows = [...block.children];
  block.innerHTML = "";

  const slidesWrapper = document.createElement("ul");
  slidesWrapper.className = "carousel-slides";

  rows.forEach((row, index) => {

    const slide = document.createElement("li");
    slide.className = "carousel-slide";

    const columns = row.querySelectorAll(":scope > div");

    columns.forEach((col, i) => {
      col.classList.add(i === 0 ? "carousel-slide-image" : "carousel-slide-content");
      slide.append(col);
    });

    slidesWrapper.append(slide);
  });

  block.append(slidesWrapper);

  /* navigation buttons */

  const nav = document.createElement("div");
  nav.className = "carousel-navigation-buttons";

  const prev = document.createElement("button");
  prev.className = "slide-prev";

  const next = document.createElement("button");
  next.className = "slide-next";

  nav.append(prev, next);
  block.append(nav);

  const slides = slidesWrapper.querySelectorAll(".carousel-slide");
  let current = 0;

  function showSlide(index) {

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    current = index;

    slidesWrapper.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth"
    });
  }

  prev.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));

  /* indicators */

  const indicators = document.createElement("div");
  indicators.className = "carousel-slide-indicators";

  slides.forEach((slide, i) => {

    const dot = document.createElement("button");

    dot.addEventListener("click", () => showSlide(i));

    indicators.append(dot);
  });

  block.append(indicators);

}