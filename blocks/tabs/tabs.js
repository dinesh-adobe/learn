export default function decorate(block) {

  const tabs = [...block.querySelectorAll('p')];

  tabs.forEach((tab, index) => {

    tab.addEventListener('click', () => {

      tabs.forEach(t => t.classList.remove('active'));

      tab.classList.add('active');

    });

    if (index === 0) {
      tab.classList.add('active');
    }

  });

}