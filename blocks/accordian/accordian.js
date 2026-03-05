document.addEventListener("DOMContentLoaded", () => {

  const accordionItems = document.querySelectorAll(".accordion.block > div");

  accordionItems.forEach((item) => {

    const header = item.querySelector(":scope > div:first-child");
    const content = item.querySelector(":scope > div:last-child");

    item.classList.add("accordion-item");

    header.addEventListener("click", () => {

      const isOpen = item.classList.contains("active");

      /* close all */
      accordionItems.forEach((i) => {
        i.classList.remove("active");
        i.querySelector(":scope > div:last-child").style.maxHeight = null;
      });

      /* open clicked */
      if (!isOpen) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }

    });

  });

});