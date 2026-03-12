export default function decorate(block) {

  const rows = [...block.children];

  /* ========= FEATURED ARTICLE ========= */

  const featured = rows[0];
  const cols = [...featured.children];

  const image = cols[0];
  const title = cols[1];
  const description = cols[2];
  const link = cols[3];

  /* Create right content panel */

  const content = document.createElement("div");
  content.className = "magazine-featured-content";

  const label = document.createElement("p");
  label.className = "magazine-featured-label";
  label.textContent = "Featured Article";

  content.append(label, title, description, link);

  /* rebuild structure */

  featured.innerHTML = "";
  featured.append(image, content);

}