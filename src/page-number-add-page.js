function getPageInfoFromText(text) {
  var match = String(text || '').match(/Page\s+(\d+)\s*\/\s*(\d+)/i);
  if (!match) return null;
  return {
    current: Number(match[1]),
    total: Number(match[2])
  };
}

function getPageCards() {
  return Array.from(document.querySelectorAll('.page-count-card'));
}

function getPageCountFromCard(card) {
  var strong = card && card.querySelector('strong');
  var match = strong && String(strong.textContent || '').match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function findButton(card, sign) {
  if (!card) return null;
  return Array.from(card.querySelectorAll('.compact-control button')).find(function (button) {
    var text = (button.textContent || '').trim();
    return !button.disabled && (text === sign || (sign === '-' && text === '−'));
  }) || null;
}

function addNextPage(total) {
  var cards = getPageCards();
  var nextCard = cards[total];
  var plusButton = findButton(nextCard, '+');
  if (plusButton) plusButton.click();
}

function removeLastPage(total) {
  if (total <= 1) return;

  var targetIndex = total - 1;

  function step() {
    var cards = getPageCards();
    var card = cards[targetIndex];
    if (!card) return;

    var count = getPageCountFromCard(card);
    if (count <= 0) return;

    var minusButton = findButton(card, '-');
    if (!minusButton) return;

    minusButton.click();

    setTimeout(function () {
      var newCards = getPageCards();
      var newCard = newCards[targetIndex];
      if (newCard && getPageCountFromCard(newCard) > 0) step();
    }, 90);
  }

  step();
}

function installPageNumberControls() {
  var styleId = 'page-number-add-remove-style';
  if (!document.getElementById(styleId)) {
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .page-number {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 4px !important;
        pointer-events: auto !important;
        cursor: default !important;
        z-index: 80 !important;
      }

      .page-number-text {
        pointer-events: none !important;
      }

      .page-number-page-button {
        width: 18px !important;
        min-width: 18px !important;
        height: 18px !important;
        min-height: 18px !important;
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 50% !important;
        border: 1px solid #94a3b8 !important;
        background: #ffffff !important;
        color: #0f172a !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        box-sizing: border-box !important;
      }

      .page-number-page-button:hover {
        background: #e0f2fe !important;
        border-color: #2563eb !important;
        color: #1d4ed8 !important;
      }

      .page-number-page-button.minus:hover {
        background: #fee2e2 !important;
        border-color: #dc2626 !important;
        color: #b91c1c !important;
      }

      .page-number-page-button:disabled {
        opacity: 0.35 !important;
        cursor: not-allowed !important;
      }

      @media print {
        .page-number-page-button {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.page-number').forEach(function (node) {
    var existingText = node.querySelector('.page-number-text');
    var rawText = existingText ? existingText.textContent : node.textContent;
    var info = getPageInfoFromText(rawText);
    if (!info) return;

    node.innerHTML = '';

    var text = document.createElement('span');
    text.className = 'page-number-text';
    text.textContent = 'Page ' + info.current + '/' + info.total;

    var minus = document.createElement('button');
    minus.type = 'button';
    minus.className = 'page-number-page-button minus';
    minus.textContent = '−';
    minus.title = 'Supprimer la dernière page';
    minus.disabled = info.total <= 1;
    minus.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      removeLastPage(info.total);
    });

    var plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'page-number-page-button plus';
    plus.textContent = '+';
    plus.title = 'Ajouter une page';
    plus.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      addNextPage(info.total);
    });

    node.appendChild(text);
    node.appendChild(minus);
    node.appendChild(plus);
  });
}

installPageNumberControls();
setTimeout(installPageNumberControls, 200);
setTimeout(installPageNumberControls, 700);
setInterval(installPageNumberControls, 500);
