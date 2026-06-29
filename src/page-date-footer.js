window.__showPageDate = window.__showPageDate !== false;

function getTodayDateText() {
  return new Date().toLocaleDateString('fr-FR');
}

function updateDateButton() {
  var button = document.querySelector('.page-date-toggle');
  if (!button) return;
  button.classList.toggle('off', !window.__showPageDate);
  button.classList.toggle('on', window.__showPageDate);
  button.textContent = window.__showPageDate ? 'Date visible' : 'Date masquée';
}

function syncPageDates() {
  var text = getTodayDateText();
  document.body.classList.toggle('hide-page-date', !window.__showPageDate);

  document.querySelectorAll('.exam-page').forEach(function (page) {
    var date = page.querySelector('.page-date');
    if (!date) {
      date = document.createElement('div');
      date.className = 'page-date';
      page.appendChild(date);
    }
    date.textContent = text;
  });

  updateDateButton();
}

function ensureDateToggleButton() {
  var panel = document.querySelector('.panel');
  if (!panel || document.querySelector('.page-date-toggle')) return;

  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'page-date-toggle on';
  button.textContent = 'Date visible';
  button.addEventListener('click', function () {
    window.__showPageDate = !window.__showPageDate;
    syncPageDates();
  });

  var barButton = panel.querySelector('.bar-ribbon-toggle');
  if (barButton && barButton.parentNode) {
    barButton.parentNode.insertBefore(button, barButton.nextSibling);
  } else {
    panel.appendChild(button);
  }
}

function syncDateFeature() {
  ensureDateToggleButton();
  syncPageDates();
}

syncDateFeature();
setTimeout(syncDateFeature, 100);
setTimeout(syncDateFeature, 400);

new MutationObserver(function () {
  syncDateFeature();
}).observe(document.body, { childList: true, subtree: true });
