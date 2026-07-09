/* eslint-disable no-use-before-define */

function buildAccordionPanel(heading, contentNodes) {
  const details = document.createElement('details');
  details.className = 'tabs-accordion-item';
  details.open = true;

  const summary = document.createElement('summary');
  summary.className = 'tabs-accordion-heading';
  summary.innerHTML = `<span>${heading}</span><span class="tabs-accordion-icon" aria-hidden="true"></span>`;

  const body = document.createElement('div');
  body.className = 'tabs-accordion-body';

  let currentGroup = null;
  let currentList = null;

  contentNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = node.tagName;

    if (tag === 'H4' || (tag === 'P' && node.querySelector('strong'))) {
      // New category group
      currentGroup = document.createElement('div');
      currentGroup.className = 'tabs-doc-group';
      body.append(currentGroup);

      const catHeading = document.createElement('h4');
      catHeading.className = 'tabs-doc-category';
      catHeading.textContent = node.textContent.trim();
      currentGroup.append(catHeading);

      currentList = document.createElement('ul');
      currentList.className = 'tabs-doc-links';
      currentGroup.append(currentList);
    } else if (tag === 'P' || tag === 'DIV') {
      const link = node.querySelector('a');
      if (link && currentList) {
        const li = document.createElement('li');
        const a = link.cloneNode(true);
        a.className = 'tabs-doc-link';
        const href = a.getAttribute('href') || '';
        const ext = href.match(/\.(pdf|xlsx|xhtml|zip|pptx)/i);
        if (ext) a.dataset.filetype = ext[1].toUpperCase();
        li.append(a);
        currentList.append(li);
      } else if (link) {
        if (!currentGroup) {
          currentGroup = document.createElement('div');
          currentGroup.className = 'tabs-doc-group';
          body.append(currentGroup);
        }
        if (!currentList) {
          currentList = document.createElement('ul');
          currentList.className = 'tabs-doc-links';
          currentGroup.append(currentList);
        }
        const li = document.createElement('li');
        const a = link.cloneNode(true);
        a.className = 'tabs-doc-link';
        li.append(a);
        currentList.append(li);
      }
    }
  });

  details.append(summary, body);
  return details;
}

export default async function decorate(block) {
  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  const tabPanels = document.createElement('div');
  tabPanels.className = 'tabs-panels';

  const rows = [...block.children];
  rows.forEach((row, i) => {
    const label = row.children[0]?.textContent.trim();
    const contentCell = row.children[1];

    // Create tab button
    const tab = document.createElement('button');
    tab.className = 'tabs-tab';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `tabpanel-${i}`);
    tab.setAttribute('id', `tab-${i}`);
    tab.textContent = label;
    if (i === 0) tab.classList.add('tabs-tab--active');
    tabList.append(tab);

    // Create tab panel
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', `tabpanel-${i}`);
    panel.setAttribute('aria-labelledby', `tab-${i}`);
    if (i !== 0) panel.hidden = true;

    // Parse content into accordion sections
    // H3 elements start new accordion panels
    if (contentCell) {
      const children = [...contentCell.querySelectorAll(':scope > *')];
      // If content wrapped in <p> by wrapTextNodes, unwrap first
      if (children.length === 1 && children[0].tagName === 'P') {
        // Content was wrapped — try to use innerHTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentCell.innerHTML;
        const unwrapped = [...tempDiv.children];
        if (unwrapped.length <= 1) {
          // Still wrapped, parse by splitting on H3-like content
          panel.append(...contentCell.childNodes);
        } else {
          processContent(unwrapped, panel);
        }
      } else {
        processContent(children, panel);
      }
    }

    tabPanels.append(panel);
  });

  function processContent(elements, panel) {
    let currentHeading = null;
    let currentContent = [];

    elements.forEach((el) => {
      if (el.tagName === 'H3') {
        // Flush previous accordion section
        if (currentHeading) {
          panel.append(buildAccordionPanel(currentHeading, currentContent));
        }
        currentHeading = el.textContent.trim();
        currentContent = [];
      } else {
        if (!currentHeading) {
          currentHeading = el.textContent.trim();
          currentContent = [];
        } else {
          currentContent.push(el);
        }
      }
    });

    // Flush last section
    if (currentHeading) {
      panel.append(buildAccordionPanel(currentHeading, currentContent));
    }
  }

  // Tab switching
  tabList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('.tabs-tab');
    if (!clickedTab) return;

    tabList.querySelectorAll('.tabs-tab').forEach((t) => {
      t.classList.remove('tabs-tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    clickedTab.classList.add('tabs-tab--active');
    clickedTab.setAttribute('aria-selected', 'true');

    tabPanels.querySelectorAll('.tabs-panel').forEach((p) => { p.hidden = true; });
    const targetPanel = tabPanels.querySelector(`#${clickedTab.getAttribute('aria-controls')}`);
    if (targetPanel) targetPanel.hidden = false;
  });

  // Keyboard navigation
  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('.tabs-tab')];
    const current = tabs.indexOf(e.target);
    let next;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (next !== undefined) {
      tabs[next].focus();
      tabs[next].click();
    }
  });

  block.textContent = '';
  block.append(tabList, tabPanels);
}
