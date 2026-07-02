function applyMobileButtonAbbreviations() {
  var existing = document.getElementById('mobile-button-abbreviations-style');
  if (existing) existing.remove();

  var style = document.createElement('style');
  style.id = 'mobile-button-abbreviations-style';
  style.textContent = `
    @media (max-width: 1200px) {
      html body .panel button::before,
      html body .assignment-control button::before,
      html body .note-scale-button::before,
      html body .pdf-lines-toggle::before,
      html body .bar-ribbon-toggle::before,
      html body .preview-pdf-button::before,
      html body .download-pdf-button::before,
      html body .page-count-card .compact-control button::before {
        position: static !important;
        display: inline !important;
        width: auto !important;
        height: auto !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        color: currentColor !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        pointer-events: none !important;
        letter-spacing: -0.25px !important;
      }

      html body .assignment-control button:nth-child(1)::before {
        content: 'Dev' !important;
        font-size: 8px !important;
      }

      html body .assignment-control button:nth-child(2)::before {
        content: 'Mai' !important;
        font-size: 8px !important;
      }

      html body .note-scale-button:nth-child(1)::before {
        content: '10' !important;
        font-size: 9px !important;
      }

      html body .note-scale-button:nth-child(2)::before {
        content: '20' !important;
        font-size: 9px !important;
      }

      html body .note-scale-button.active::after {
        content: 'Lib' !important;
        position: absolute !important;
        right: -2px !important;
        top: -5px !important;
        min-width: 16px !important;
        height: 10px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 999px !important;
        background: #ffffff !important;
        color: #0f172a !important;
        border: 1px solid #94a3b8 !important;
        font-size: 6px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        box-sizing: border-box !important;
        pointer-events: none !important;
      }

      html body .pdf-lines-toggle::before {
        content: 'Lig' !important;
        font-size: 8px !important;
      }

      html body .bar-ribbon-toggle::before {
        content: 'Bar' !important;
        font-size: 8px !important;
      }

      html body .preview-pdf-button::before {
        content: 'Voir' !important;
        font-size: 7px !important;
      }

      html body .download-pdf-button::before,
      html body .panel > button.secondary::before {
        content: 'PDF' !important;
        font-size: 8px !important;
      }

      html body .page-count-card .compact-control button:first-child::before {
        content: '-' !important;
        font-size: 12px !important;
      }

      html body .page-count-card .compact-control button:last-child::before {
        content: '+' !important;
        font-size: 12px !important;
      }

      html body .exercise-title-controls button:first-of-type::before {
        content: '-' !important;
      }

      html body .exercise-title-controls button:last-of-type::before {
        content: '+' !important;
      }
    }

    @media (max-width: 430px) {
      html body .assignment-control button:nth-child(1)::before,
      html body .assignment-control button:nth-child(2)::before,
      html body .pdf-lines-toggle::before,
      html body .bar-ribbon-toggle::before,
      html body .download-pdf-button::before,
      html body .panel > button.secondary::before {
        font-size: 7px !important;
      }

      html body .preview-pdf-button::before {
        font-size: 6.5px !important;
      }

      html body .note-scale-button.active::after {
        right: -1px !important;
        top: -5px !important;
        min-width: 15px !important;
        height: 9px !important;
        font-size: 5.5px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

applyMobileButtonAbbreviations();
setTimeout(applyMobileButtonAbbreviations, 150);
setTimeout(applyMobileButtonAbbreviations, 600);
setTimeout(applyMobileButtonAbbreviations, 1200);
