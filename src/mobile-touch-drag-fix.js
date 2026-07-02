const TOUCH_DRAG_SELECTORS = [
  '.resize-handle',
  '.bar-mark',
  '.draggable-photo',
  '.white-mask',
  '.mask-resize-handle'
].join(',');

const TOUCH_SPEED_BY_SELECTOR = [
  { selector: '.resize-handle', speed: 2.4 },
  { selector: '.bar-mark', speed: 2.2 },
  { selector: '.draggable-photo', speed: 2.0 },
  { selector: '.white-mask', speed: 2.0 },
  { selector: '.mask-resize-handle', speed: 2.0 }
];

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
let startTouchPoint = null;
let lastTouchPoint = null;
let activeTouchSpeed = 2;

function isTouchDragTarget(target) {
  return target?.closest?.(TOUCH_DRAG_SELECTORS) || null;
}

function getTouchSpeed(target) {
  const match = TOUCH_SPEED_BY_SELECTOR.find((item) => target?.matches?.(item.selector) || target?.closest?.(item.selector));
  return match?.speed || 2;
}

function amplifyTouchPoint(point) {
  if (!point || !startTouchPoint) return point;
  return {
    clientX: startTouchPoint.clientX + (point.clientX - startTouchPoint.clientX) * activeTouchSpeed,
    clientY: startTouchPoint.clientY + (point.clientY - startTouchPoint.clientY) * activeTouchSpeed,
    screenX: startTouchPoint.screenX + (point.screenX - startTouchPoint.screenX) * activeTouchSpeed,
    screenY: startTouchPoint.screenY + (point.screenY - startTouchPoint.screenY) * activeTouchSpeed
  };
}

function installMobileTouchDragFix() {
  document.addEventListener('touchstart', (event) => {
    const target = isTouchDragTarget(event.target);
    if (!target) return;

    activeTouchTarget = target;
    activeTouchSpeed = getTouchSpeed(target);
    startTouchPoint = pointFromTouchEvent(event);
    lastTouchPoint = startTouchPoint;
    event.preventDefault();
    event.stopPropagation();
    dispatchMouseLikeEvent(activeTouchTarget, 'mousedown', startTouchPoint);
  }, { passive: false, capture: true });

  document.addEventListener('touchmove', (event) => {
    if (!activeTouchTarget) return;

    const rawPoint = pointFromTouchEvent(event) || lastTouchPoint;
    lastTouchPoint = amplifyTouchPoint(rawPoint);
    event.preventDefault();
    event.stopPropagation();

    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mousemove', lastTouchPoint);
  }, { passive: false, capture: true });

  document.addEventListener('touchend', (event) => {
    if (!activeTouchTarget) return;

    const rawPoint = pointFromTouchEvent(event) || lastTouchPoint;
    const point = amplifyTouchPoint(rawPoint) || lastTouchPoint;
    event.preventDefault();
    event.stopPropagation();

    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mouseup', point);
    activeTouchTarget = null;
    startTouchPoint = null;
    lastTouchPoint = null;
    activeTouchSpeed = 2;
  }, { passive: false, capture: true });

  document.addEventListener('touchcancel', () => {
    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mouseup', lastTouchPoint);
    activeTouchTarget = null;
    startTouchPoint = null;
    lastTouchPoint = null;
    activeTouchSpeed = 2;
  }, { passive: true, capture: true });
}

installMobileTouchDragFix();
