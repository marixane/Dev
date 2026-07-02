function getFooterInfo(node) {
  var match = String(node?.textContent || '').match(/Page\s+(\d+)\s*\/\s*(\d+)/i);
  if (!match) return null;
  return { current: Number(match[1]), total: Number(match[2]) };
}

function getCountCards() {
  return Array.from(document.querySelectorAll('.page-count-card'));
}

function getCardCount(card) {
  var match = String(card?.querySelector('strong')?.textContent || '').match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function clickCardButton(card, wanted) {
  if (!card) return false;
  var buttons = Array.from(card.querySelectorAll('.compact-control button'));
  var button = buttons.find(function (b) {
    var text = String(b.textContent || '').trim();
    return !b.disabled && (text === wanted || (wanted === '-' && text === '−'));
  });
  if (!button) return false;
  button.click();
  return true;
}

function addPage(total) {
  var card = getCountCards()[total];
  clickCardButton(card, '+');
}

function removeLastPage(total) {
  if (total <= 1) return;
  var index = total - 1;

  function removeOneExercise() {
    var card = getCountCards()[index];
    if (!card || getCardCount(card) <= 0) return;
    if (!clickCardButton(card, '-')) return;
    setTimeout(removeOneExercise, 90);
  }

  removeOneExercise();
}

function ensurePageControlStyle() {
  if (document.getElementById('safe-page-controls-style')) return;
  var style = document.createElement('style');
  style.id = 'safe-page-controls-style';
  style.textContent = '.page-number-safe-controls{position:fixed!important;display:inline-flex!important;gap:3px!important;z-index:999999!important;pointer-events:auto!important}.page-number-safe-controls button{width:16px!important;min-width:16px!important;height:16px!important;min-height:16px!important;border-radius:50%!important;border:1px solid #94a3b8!important;background:#fff!important;color:#0f172a!important;font-size:12px!important;font-weight:900!important;line-height:1!important;padding:0!important;margin:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important}.page-number-safe-controls button:hover{background:#e0f2fe!important;border-color:#2563eb!important;color:#1d4ed8!important}.page-number-safe-controls button.minus:hover{background:#fee2e2!important;border-color:#dc2626!important;color:#b91c1c!important}.page-number-safe-controls button:disabled{opacity:.35!important;cursor:not-allowed!important}@media print{.page-number-safe-controls{display:none!important}}';
  document.head.appendChild(style);
}

function makeControl(node) {
  var control = document.createElement('span');
  control.className = 'page-number-safe-controls';

  var minus = document.createElement('button');
  minus.type = 'button';
  minus.className = 'minus';
  minus.textContent = '−';
  minus.title = 'Supprimer la dernière page';

  var plus = document.createElement('button');
  plus.type = 'button';
  plus.textContent = '+';
  plus.title = 'Ajouter une page';

  minus.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var info = getFooterInfo(node);
    if (info) removeLastPage(info.total);
  });

  plus.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var info = getFooterInfo(node);
    if (info) addPage(info.total);
  });

  control.appendChild(minus);
  control.appendChild(plus);
  document.body.appendChild(control);
  return control;
}

function syncPageNumberControls() {
  ensurePageControlStyle();
  var pageNumbers = Array.from(document.querySelectorAll('.page-number'));
  var alive = new Set();

  pageNumbers.forEach(function (node, index) {
    var info = getFooterInfo(node);
    if (!info) return;

    var id = 'page-number-control-' + index;
    alive.add(id);
    var control = document.querySelector('[data-page-number-control="' + id + '"]') || makeControl(node);
    control.dataset.pageNumberControl = id;

    var rect = node.getBoundingClientRect();
    control.style.left = Math.round(rect.right + 5) + 'px';
    control.style.top = Math.round(rect.top + rect.height / 2 - 8) + 'px';
    control.querySelector('.minus').disabled = info.total <= 1;
  });

  document.querySelectorAll('.page-number-safe-controls').forEach(function (control) {
    if (!alive.has(control.dataset.pageNumberControl)) control.remove();
  });
}

syncPageNumberControls();
setTimeout(syncPageNumberControls, 200);
setTimeout(syncPageNumberControls, 700);
setInterval(syncPageNumberControls, 500);
window.addEventListener('resize', syncPageNumberControls);
document.addEventListener('scroll', syncPageNumberControls, true);
