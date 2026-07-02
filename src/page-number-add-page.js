function getPageCountFromFooter(text) {
  var match = String(text || '').match(/Page\s+(\d+)\s*\/\s*(\d+)/i);
  if (!match) return null;
  return {
    current: Number(match[1]),
    total: Number(match[2])
  };
}

function findAddButtonForPage(pageNumber) {
  var cards = Array.from(document.querySelectorAll('.page-count-card'));
  var card = cards[pageNumber - 1];
  if (!card) return null;

  var buttons = Array.from(card.querySelectorAll('.compact-control button'));
  return buttons.find(function (button) {
    return (button.textContent || '').trim() === '+' && !button.disabled;
  }) || null;
}

function addNextPageFromFooter(pageNumberNode) {
  var info = getPageCountFromFooter(pageNumberNode.textContent);
  if (!info) return;

  var nextPageNumber = info.total + 1;
  var addButton = findAddButtonForPage(nextPageNumber);
  if (!addButton) return;

  addButton.click();
}

function preparePageNumberClickToAddPage() {
  document.querySelectorAll('.page-number').forEach(function (node) {
    if (node.dataset.addPageReady === 'true') return;
    node.dataset.addPageReady = 'true';
    node.title = 'Cliquer pour ajouter une nouvelle page';
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');

    node.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      addNextPageFromFooter(node);
    });

    node.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      addNextPageFromFooter(node);
    });
  });
}

preparePageNumberClickToAddPage();
setTimeout(preparePageNumberClickToAddPage, 200);
setTimeout(preparePageNumberClickToAddPage, 700);
setInterval(preparePageNumberClickToAddPage, 500);
