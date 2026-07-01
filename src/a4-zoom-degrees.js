const A4_ZOOM_KEY = 'a4-preview-zoom-mode';
const ZOOM_LEVELS = [
  { label: 'Auto', value: 'auto' },
  { label: '40%', value: '0.40' },
  { label: '50%', value: '0.50' },
  { label: '60%', value: '0.60' },
  { label: '70%', value: '0.70' },
  { label: '80%', value: '0.80' },
  { label: '90%', value: '0.90' },
  { label: '100%', value: '1.00' }
];

function getA4ZoomMode() {
  return localStorage.getItem(A4_ZOOM_KEY) || 'auto';
}

function applyA4ZoomMode(mode) {
  const safeMode = ZOOM_LEVELS.some((z) => z.value === mode) ? mode : 'auto';
  localStorage.setItem(A4_ZOOM_KEY, safeMode);
  document.body.classList.toggle('manual-a4-zoom', safeMode !== 'auto');
  if (safeMode !== 'auto') {
    document.documentElement.style.setProperty('--a4-manual-zoom', safeMode);
  } else {
    document.documentElement.style.removeProperty('--a4-manual-zoom');
  }
  updateA4ZoomButtons();
}

function updateA4ZoomButtons() {
  const mode = getA4ZoomMode();
  document.querySelectorAll('.a4-zoom-button').forEach(function (button) {
    button.classList.toggle('active', button.dataset.zoom === mode);
  });
}

function ensureA4ZoomControl() {
  const panel = document.querySelector('.panel');
  if (!panel || panel.querySelector('.a4-zoom-control')) return;

  const control = document.createElement('div');
  control.className = 'a4-zoom-control';

  const title = document.createElement('span');
  title.className = 'a4-zoom-title';
  title.textContent = 'Zoom A4';

  const buttons = document.createElement('div');
  buttons.className = 'a4-zoom-buttons';

  ZOOM_LEVELS.forEach(function (zoom) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'a4-zoom-button';
    button.dataset.zoom = zoom.value;
    button.textContent = zoom.label;
    button.addEventListener('click', function () {
      applyA4ZoomMode(zoom.value);
    });
    buttons.appendChild(button);
  });

  control.appendChild(title);
  control.appendChild(buttons);

  const dateControl = panel.querySelector('.page-date-control');
  if (dateControl && dateControl.nextSibling) panel.insertBefore(control, dateControl.nextSibling);
  else panel.appendChild(control);

  updateA4ZoomButtons();
}

function syncA4ZoomControl() {
  if (!document.body) return;
  ensureA4ZoomControl();
  applyA4ZoomMode(getA4ZoomMode());
}

syncA4ZoomControl();
setTimeout(syncA4ZoomControl, 200);
setTimeout(syncA4ZoomControl, 700);

window.applyA4ZoomMode = applyA4ZoomMode;
