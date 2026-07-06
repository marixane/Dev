import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

let pdfDirectBusy = false;

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function getPdfButton(target) {
  const button = target && target.closest && target.closest('button');
  if (!button || button.disabled) return null;
  const text = String(button.textContent || '').trim().toLowerCase();
  if (!text.includes('pdf')) return null;
  if (text.includes('voir')) return { button: button, mode: 'preview' };
  if (text.includes('exporter') || text.includes('télécharger') || text.includes('telecharger')) return { button: button, mode: 'download' };
  return null;
}

function wait(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

function copyTextareaValues(original, clone) {
  const originalFields = original.querySelectorAll('textarea, input');
  const cloneFields = clone.querySelectorAll('textarea, input');
  originalFields.forEach(function (field, index) {
    const copy = cloneFields[index];
    if (!copy) return;
    copy.value = field.value;
    copy.textContent = field.value;
    copy.setAttribute('value', field.value);
  });
}

function preparePdfClone(original) {
  const clone = original.cloneNode(true);
  copyTextareaValues(original, clone);

  clone.classList.add('is-exporting', 'pdf-clone-page');
  clone.classList.remove('second-page');
  clone.style.setProperty('position', 'relative', 'important');
  clone.style.setProperty('left', '0', 'important');
  clone.style.setProperty('top', '0', 'important');
  clone.style.setProperty('width', `${A4_WIDTH_PX}px`, 'important');
  clone.style.setProperty('height', `${A4_HEIGHT_PX}px`, 'important');
  clone.style.setProperty('min-width', `${A4_WIDTH_PX}px`, 'important');
  clone.style.setProperty('min-height', `${A4_HEIGHT_PX}px`, 'important');
  clone.style.setProperty('max-width', `${A4_WIDTH_PX}px`, 'important');
  clone.style.setProperty('max-height', `${A4_HEIGHT_PX}px`, 'important');
  clone.style.setProperty('margin', '0', 'important');
  clone.style.setProperty('transform', 'none', 'important');
  clone.style.setProperty('scale', '1', 'important');
  clone.style.setProperty('translate', '0 0', 'important');
  clone.style.setProperty('box-sizing', 'border-box', 'important');

  clone.querySelectorAll('.photo-overlay-tools, .mask-delete-button, .mask-resize-handle, .bar-buttons').forEach(function (el) {
    el.remove();
  });

  const linesToggle = document.querySelector('.pdf-lines-toggle');
  const hideLines = linesToggle && String(linesToggle.textContent || '').toLowerCase().includes('masquées');
  clone.classList.toggle('no-pdf-lines', !!hideLines);

  return clone;
}

function createHiddenPdfWorkspace() {
  const workspace = document.createElement('div');
  workspace.className = 'pdf-hidden-workspace';
  workspace.style.setProperty('position', 'fixed', 'important');
  workspace.style.setProperty('left', '-12000px', 'important');
  workspace.style.setProperty('top', '0', 'important');
  workspace.style.setProperty('width', `${A4_WIDTH_PX}px`, 'important');
  workspace.style.setProperty('height', `${A4_HEIGHT_PX}px`, 'important');
  workspace.style.setProperty('overflow', 'visible', 'important');
  workspace.style.setProperty('background', '#fff', 'important');
  workspace.style.setProperty('z-index', '-1', 'important');
  document.body.appendChild(workspace);
  return workspace;
}

function isAlmostWhite(data, index) {
  return data[index] > 248 && data[index + 1] > 248 && data[index + 2] > 248;
}

function cropLargeWhiteMargins(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return canvas;

  const width = canvas.width;
  const height = canvas.height;
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      if (!isAlmostWhite(data, index)) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0 || maxY < 0) return canvas;

  const padding = 4;
  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(width - 1, maxX + padding);
  maxY = Math.min(height - 1, maxY + padding);

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  const hasHugeHorizontalMargin = cropWidth < width * 0.88;
  const hasHugeVerticalMargin = cropHeight < height * 0.88;

  if (!hasHugeHorizontalMargin && !hasHugeVerticalMargin) return canvas;

  const cropped = document.createElement('canvas');
  cropped.width = cropWidth;
  cropped.height = cropHeight;
  const croppedCtx = cropped.getContext('2d');
  croppedCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  return cropped;
}

function addCanvasFullPage(pdf, canvas) {
  const cleanCanvas = cropLargeWhiteMargins(canvas);
  pdf.addImage(cleanCanvas.toDataURL('image/jpeg', 1), 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
}

async function makeOriginalPdf() {
  const visiblePages = Array.from(document.querySelectorAll('.preview-zone .a4-page'));
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  for (let index = 0; index < visiblePages.length; index += 1) {
    const workspace = createHiddenPdfWorkspace();
    const clone = preparePdfClone(visiblePages[index]);
    workspace.appendChild(clone);

    await wait(80);

    const canvas = await html2canvas(clone, {
      scale: 2,
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight: A4_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: '#fff'
    });

    workspace.remove();

    if (index) pdf.addPage('a4', 'portrait');
    addCanvasFullPage(pdf, canvas);
  }

  return pdf;
}

async function runDirectPdf(button, mode, previewWindow) {
  if (pdfDirectBusy) return;
  pdfDirectBusy = true;
  const previousText = button.textContent;
  button.disabled = true;
  button.textContent = mode === 'preview' ? 'Préparation...' : 'Export en cours...';

  try {
    const pdf = await makeOriginalPdf();
    if (mode === 'preview') {
      const url = pdf.output('bloburl');
      if (previewWindow) previewWindow.location.href = url;
      else window.open(url, '_blank');
    } else {
      pdf.save('devoir-a4.pdf');
    }
  } finally {
    button.disabled = false;
    button.textContent = previousText;
    pdfDirectBusy = false;
  }
}

document.addEventListener('click', function (event) {
  const action = getPdfButton(event.target);
  if (!action) return;

  event.preventDefault();
  event.stopPropagation();
  if (event.stopImmediatePropagation) event.stopImmediatePropagation();

  const previewWindow = action.mode === 'preview' ? window.open('', '_blank') : null;
  runDirectPdf(action.button, action.mode, previewWindow);
}, true);
