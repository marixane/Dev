const TOUCH_DRAG_SELECTORS = [
  '.resize-handle',
  '.bar-mark',
  '.draggable-photo',
  '.white-mask',
  '.mask-resize-handle'
].join(',');

function pointFromTouchEvent(event) {
  const touch = event.touches?.[0] || event.changedTouches?.[0];
  if (!touch) return null;
  return {
    clientX: touch.clientX,
    clientY: touch.clientY,
    screenX: touch.screenX,
    screenY: touch.screenY
  };
}

function dispatchMouseLikeEvent(target, type, point) {
  if (!target || !point) return;
  target.dispatchEvent(new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: point.clientX,
    clientY: point.clientY,
    screenX: point.screenX,
    screenY: point.screenY,
    buttons: type === 'mouseup' ? 0 : 1
  }));
}

let activeTouchTarget = null;
let lastTouchPoint = null;

function isTouchDragTarget(target) {
  return target?.closest?.(TOUCH_DRAG_SELECTORS) || null;
}

function installMobileTouchDragFix() {
  document.addEventListener('touchstart', (event) => {
    const target = isTouchDragTarget(event.target);
    if (!target) return;

    activeTouchTarget = target;
    lastTouchPoint = pointFromTouchEvent(event);
    event.preventDefault();
    event.stopPropagation();
    dispatchMouseLikeEvent(activeTouchTarget, 'mousedown', lastTouchPoint);
  }, { passive: false, capture: true });

  document.addEventListener('touchmove', (event) => {
    if (!activeTouchTarget) return;

    lastTouchPoint = pointFromTouchEvent(event) || lastTouchPoint;
    event.preventDefault();
    event.stopPropagation();

    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mousemove', lastTouchPoint);
  }, { passive: false, capture: true });

  document.addEventListener('touchend', (event) => {
    if (!activeTouchTarget) return;

    const point = pointFromTouchEvent(event) || lastTouchPoint;
    event.preventDefault();
    event.stopPropagation();

    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mouseup', point);
    activeTouchTarget = null;
    lastTouchPoint = null;
  }, { passive: false, capture: true });

  document.addEventListener('touchcancel', () => {
    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mouseup', lastTouchPoint);
    activeTouchTarget = null;
    lastTouchPoint = null;
  }, { passive: true, capture: true });
}

installMobileTouchDragFix();
