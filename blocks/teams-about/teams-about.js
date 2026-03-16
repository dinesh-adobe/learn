export default function decorate(block) {
  const rows = [...block.children];

  const images = [...rows[0].children];
  const names = [...rows[1].children];
  const roles = [...rows[2].children];
  const socials = [...rows[3].children];

  const wrapper = document.createElement('div');
  wrapper.className = 'team-wrapper';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < images.length; i++) {
    const card = document.createElement('div');
    card.className = 'team-card';

    /* image */
    const picture = images[i].querySelector('picture');
    const imgDiv = document.createElement('div');
    imgDiv.className = 'team-image';
    if (picture) imgDiv.append(picture.cloneNode(true));

    /* name */
    const name = document.createElement('h3');
    name.textContent = names[i].textContent.trim();

    /* role */
    const role = document.createElement('p');
    role.className = 'team-role';
    role.textContent = roles[i].textContent.trim();

    /* social */
    const social = document.createElement('div');
    social.className = 'team-social';

    const links = socials[i].querySelectorAll('a');

    links.forEach((link) => {
      let iconName = '';

      if (link.textContent.toLowerCase().includes('facebook')) { iconName = 'facebook'; }

      if (link.textContent.toLowerCase().includes('twitter')) { iconName = 'twitter'; }

      if (link.textContent.toLowerCase().includes('instagram')) { iconName = 'instagram'; }

      const a = document.createElement('a');
      a.href = link.href;

      const img = document.createElement('img');
      img.src = `/icons/${iconName}.svg`;
      img.alt = iconName;

      a.append(img);
      social.append(a);
    });

    card.append(imgDiv);
    card.append(name);
    card.append(role);
    card.append(social);

    wrapper.append(card);
  }

  block.textContent = '';
  block.append(wrapper);
}
