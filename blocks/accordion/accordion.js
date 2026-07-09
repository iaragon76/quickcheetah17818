import { loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  const items = [...block.children];
  const accordion = document.createElement('div');
  accordion.className = 'accordion-items';

  items.forEach((item, i) => {
    const heading = item.children[0]?.textContent.trim();
    const content = item.children[1];

    const details = document.createElement('details');
    details.className = 'accordion-item';
    if (i === 0) details.open = true;

    const summary = document.createElement('summary');
    summary.className = 'accordion-heading';
    summary.innerHTML = `<span>${heading}</span><span class="accordion-icon" aria-hidden="true"></span>`;

    const body = document.createElement('div');
    body.className = 'accordion-body';
    if (content) body.append(...content.childNodes);

    details.append(summary, body);
    accordion.append(details);
  });

  block.textContent = '';
  block.append(accordion);

  // Decorate nested blocks (e.g., document-list) inside accordion panels
  const nestedBlocks = accordion.querySelectorAll('.document-list');
  await Promise.all([...nestedBlocks].map(async (nested) => {
    const blockName = nested.classList[0];
    nested.classList.add('block');
    nested.dataset.blockName = blockName;
    nested.dataset.blockStatus = 'initialized';
    await loadBlock(nested);
  }));
}
