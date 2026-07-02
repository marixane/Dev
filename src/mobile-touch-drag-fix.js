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

function distanceBetweenTouches(event) {
  if (!event.touches || event.touches.length < 2) return 0;
  const a = event.touches[0];
  const b = event.touches[1];
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getPhotoZoomInput(photo) {
  const body = photo?.closest?.('.exercise-body');
  return body?.querySelector?.('.photo-zoom-control input[type="range"]') || null;
}

function setNativeInputValue(input, value) {
  const proto = window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  setter?.call(input, String(value));
}

function updatePhotoZoomFromPinch(photo, zoom) {
  const input = getPhotoZoomInput(photo);
  if (!input) return;
  const min = Number(input.min || 60);
  const max = Number(input.max || 220);
  const next = Math.min(Math.max(Math.round(zoom), min), max);
  setNativeInputValue(input, next);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
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
let pinchPhoto = null;
let pinchStartDistance = 0;
let pinchStartZoom = 100;

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

function resetDragState() {
  activeTouchTarget = null;
  startTouchPoint = null;
  lastTouchPoint = null;
  activeTouchSpeed = 2;
}

function resetPinchState() {
  pinchPhoto = null;
  pinchStartDistance = 0;
  pinchStartZoom = 100;
}

function installMobileTouchDragFix() {
  document.addEventListener('touchstart', (event) => {
    const photo = event.target?.closest?.('.draggable-photo');

    if (photo && event.touches?.length === 2) {
      const input = getPhotoZoomInput(photo);
      if (!input) return;
      pinchPhoto = photo;
      pinchStartDistance = distanceBetweenTouches(event);
      pinchStartZoom = Number(input.value || 100);
      event.preventDefault();
      event.stopPropagation();
      const appShell = document.querySelector('.app-shell') || photo;
      dispatchMouseLikeEvent(appShell, 'mouseup', pointFromTouchEvent(event));
      resetDragState();
      return;
    }

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
    if (pinchPhoto && event.touches?.length === 2) {
      const currentDistance = distanceBetweenTouches(event);
      if (pinchStartDistance > 0 && currentDistance > 0) {
        updatePhotoZoomFromPinch(pinchPhoto, pinchStartZoom * (currentDistance / pinchStartDistance));
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!activeTouchTarget) return;

    const rawPoint = pointFromTouchEvent(event) || lastTouchPoint;
    lastTouchPoint = amplifyTouchPoint(rawPoint);
    event.preventDefault();
    event.stopPropagation();

    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mousemove', lastTouchPoint);
  }, { passive: false, capture: true });

  document.addEventListener('touchend', (event) => {
    if (pinchPhoto) {
      event.preventDefault();
      event.stopPropagation();
      resetPinchState();
      return;
    }

    if (!activeTouchTarget) return;

    const rawPoint = pointFromTouchEvent(event) || lastTouchPoint;
    const point = amplifyTouchPoint(rawPoint) || lastTouchPoint;
    event.preventDefault();
    event.stopPropagation();

    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mouseup', point);
    resetDragState();
  }, { passive: false, capture: true });

  document.addEventListener('touchcancel', () => {
    const appShell = document.querySelector('.app-shell') || activeTouchTarget;
    dispatchMouseLikeEvent(appShell, 'mouseup', lastTouchPoint);
    resetDragState();
    resetPinchState();
  }, { passive: true, capture: true });
}

installMobileTouchDragFix();
