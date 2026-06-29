window.__examLanguage = window.__examLanguage || localStorage.getItem('examLanguage') || 'fr';

function syncLanguageButton() {
  var panel = document.querySelector('.panel');
  if (!panel) return;

  var button = document.querySelector('.language-toggle');
  if (!button) {
    button = document.createElement('button');
    button.className = 'language-toggle';
    button.type = 'button';
    button.addEventListener('click', function () {
      window.__examLanguage = window.__examLanguage === 'ar' ? 'fr' : 'ar';
      localStorage.setItem('examLanguage', window.__examLanguage);
      syncLanguageMode();
    });

    var title = panel.querySelector('.eyebrow');
    if (title && title.nextSibling) panel.insertBefore(button, title.nextSibling);
    else panel.insertBefore(button, panel.firstChild);
  }

  button.textContent = window.__examLanguage === 'ar' ? 'Français' : 'العربية';
}

function syncLanguageMode() {
  document.body.classList.toggle('arabic-mode', window.__examLanguage === 'ar');
  document.documentElement.setAttribute('dir', 'ltr');
  syncLanguageButton();
}

syncLanguageMode();
setTimeout(syncLanguageMode, 100);
setTimeout(syncLanguageMode, 400);

new MutationObserver(function () {
  syncLanguageButton();
}).observe(document.body, { childList: true, subtree: true });
