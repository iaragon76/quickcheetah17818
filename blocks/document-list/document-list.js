export default function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('div');
  list.className = 'document-list-inner';

  rows.forEach((row) => {
    const categoryCell = row.children[0];
    const linksCell = row.children[1];

    const group = document.createElement('div');
    group.className = 'document-list-group';

    // Category heading
    const categoryText = categoryCell?.textContent.trim();
    if (categoryText) {
      const heading = document.createElement('h4');
      heading.className = 'document-list-category';
      heading.textContent = categoryText;
      group.append(heading);
    }

    // Links
    if (linksCell) {
      const links = linksCell.querySelectorAll('a');
      const ul = document.createElement('ul');
      ul.className = 'document-list-links';

      links.forEach((a) => {
        const li = document.createElement('li');
        const link = a.cloneNode(true);
        link.className = 'document-list-link';

        const href = link.getAttribute('href') || '';
        const ext = href.match(/\.(pdf|xlsx|xhtml|zip|pptx)/i);
        if (ext) link.dataset.filetype = ext[1].toUpperCase();

        li.append(link);
        ul.append(li);
      });

      group.append(ul);
    }

    list.append(group);
  });

  block.textContent = '';
  block.append(list);
}
