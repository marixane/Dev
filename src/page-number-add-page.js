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
  clickCardButton(getCountCards()[total], '+');
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
  style.textContent = '.page-number{display:inline-flex!important;align-items:center!important;justify-content:flex-end!important;gap:5px!important;pointer-events:auto!important;z-index:90!important}.page-number-safe-controls{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:3px!important;pointer-events:auto!important}.page-number-safe-controls button{width:17px!important;min-width:17px!important;height:17px!important;min-height:17px!important;border-radius:50%!important;border:1px solid #94a3b8!important;background:#fff!important;color:#0f172a!important;font-size:12px!important;font-weight:900!important;line-height:1!important;padding:0!important;margin:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;box-sizing:border-box!important}.page-number-safe-controls button:hover{background:#e0f2fe!important;border-color:#2563eb!important;color:#1d4ed8!important}.page-number-safe-controls button.minus:hover{background:#fee2e2!important;border-color:#dc2626!important;color:#b91c1c!important}.page-number-safe-controls button:disabled{opacity:.35!important;cursor:not-allowed!important}@media print{.page-number-safe-controls{display:none!important}}';
  document.head.appendChild(style);
}

function makeControls(node) {
  var controls = document.createElement('span');
  controls.className = 'page-number-safe-controls';

  var minus = document.createElement('button');
  minus.type = 'button';
  minus.className = 'minus';
  minus.textContent = '−';
  minus.title = 'Supprimer la dernière page';

  var plus = document.createElement('button');
  plus.type = 'button';
  plus.className = 'plus';
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

  controls.appendChild(minus);
  controls.appendChild(plus);
  return controls;
}

function syncPageNumberControls() {
  ensurePageControlStyle();

  document.querySelectorAll('.page-number').forEach(function (node) {
    var info = getFooterInfo(node);
    if (!info) return;

    var old = node.querySelector('.page-number-safe-controls');
    if (!old) old = makeControls(node);
    if (!old.parentNode) node.appendChild(old);

    var minus = old.querySelector('.minus');
    if (minus) minus.disabled = info.total <= 1;
  });
}

syncPageNumberControls();
setTimeout(syncPageNumberControls, 200);
setTimeout(syncPageNumberControls, 700);
setInterval(syncPageNumberControls, 500);
window.addEventListener('resize', syncPageNumberControls);
