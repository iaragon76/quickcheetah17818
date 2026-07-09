export default function decorate(block) {
  const rows = [...block.children];
  const card = document.createElement('div');
  card.className = 'report-card-inner';

  // First row: image
  const imageRow = rows[0];
  const picture = imageRow?.querySelector('picture');
  if (picture) {
    const imageCol = document.createElement('div');
    imageCol.className = 'report-card-image';
    imageCol.append(picture);
    card.append(imageCol);
  }

  // Content column
  const contentCol = document.createElement('div');
  contentCol.className = 'report-card-content';

  // Remaining rows: content (heading, date, description, links)
  rows.slice(picture ? 1 : 0).forEach((row) => {
    const content = row.children[0] || row;
    [...content.childNodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        contentCol.append(node.cloneNode(true));
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        contentCol.append(p);
      }
    });
  });

  // Style date elements (paragraphs that look like dates)
  contentCol.querySelectorAll('p').forEach((p) => {
    const text = p.textContent.trim();
    if (/^[A-Z]+ \d{1,2}, \d{4}$/i.test(text)) {
      p.classList.add('report-card-date');
    }
  });

  // Style download links
  contentCol.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href.includes('.pdf') || href.includes('.xlsx') || href.includes('.xhtml') || href.includes('.zip')) {
      a.classList.add('report-card-download');
      const ext = href.match(/\.(pdf|xlsx|xhtml|zip)/i);
      if (ext) a.dataset.filetype = ext[1].toUpperCase();
    }
  });

  card.append(contentCol);
  block.textContent = '';
  block.append(card);
}
