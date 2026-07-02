function applyMobileButtonAbbreviations() {
  var existing = document.getElementById('mobile-button-abbreviations-style');
  if (existing) existing.remove();

  var style = document.createElement('style');
  style.id = 'mobile-button-abbreviations-style';
  style.textContent = `
    @media (max-width: 1200px) {
      html body .assignment-control button {
        background: #e2e8f0 !important;
        color: #0f172a !important;
        border: 1px solid #94a3b8 !important;
        opacity: 1 !important;
      }

      html body .assignment-control button:disabled {
        background: #cbd5e1 !important;
        color: #0f172a !important;
        opacity: 0.75 !important;
      }

      html body .panel button::before,
      html body .assignment-control button::before,
      html body .note-scale-button::before,
      html body .pdf-lines-toggle::before,
      html body .bar-ribbon-toggle::before,
      html body .preview-pdf-button::before,
      html body .download-pdf-button::before,
      html body .page-count-card .compact-control button::before,
      html body .mobile-lang-ar::before,
      html body .mobile-lang-fr::before,
      html body .arabic-toggle-button::before,
      html body .arabic-mode-toggle::before,
      html body button[class*="arabic"]::before,
      html body button[class*="language"]::before,
      html body button[class*="lang"]::before {
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
        letter-spacing: -0.45px !important;
      }

      html body .assignment-control button:nth-child(1)::before { content: 'Dev' !important; font-size: 6.5px !important; }
      html body .assignment-control button:nth-child(2)::before { content: 'Mai' !important; font-size: 6.5px !important; }
      html body .note-scale-button:nth-child(1)::before { content: '10' !important; font-size: 7.5px !important; }
      html body .note-scale-button:nth-child(2)::before { content: '20' !important; font-size: 7.5px !important; }

      html body .note-scale-button.active::after {
        content: 'Lib' !important;
        position: absolute !important;
        right: 0 !important;
        top: -4px !important;
        min-width: 13px !important;
        height: 8px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 999px !important;
        background: #ffffff !important;
        color: #0f172a !important;
        border: 1px solid #94a3b8 !important;
        font-size: 5px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        box-sizing: border-box !important;
        pointer-events: none !important;
      }

      html body .pdf-lines-toggle::before { content: 'Lig' !important; font-size: 6.5px !important; }
      html body .bar-ribbon-toggle::before { content: 'Bar' !important; font-size: 6.5px !important; }
      html body .preview-pdf-button::before { content: 'Voir' !important; font-size: 5.8px !important; }
      html body .download-pdf-button::before,
      html body .panel > button.secondary::before { content: 'PDF' !important; font-size: 6.8px !important; }

      html body .mobile-lang-ar::before,
      html body .arabic-toggle-button::before,
      html body .arabic-mode-toggle::before,
      html body button[class*="arabic"]::before { content: 'Ar' !important; font-size: 7px !important; }

      html body .mobile-lang-fr::before,
      html body button[class*="french"]::before,
      html body button[class*="francais"]::before,
      html body button[class*="français"]::before,
      html body button[data-lang="fr"]::before { content: 'Fr' !important; font-size: 7px !important; }

      html body .page-count-card .compact-control button:first-child::before { content: '+' !important; font-size: 11px !important; }
      html body .page-count-card .compact-control button:last-child::before { content: '-' !important; font-size: 11px !important; }
      html body .exercise-title-controls button:first-of-type::before { content: '-' !important; font-size: 10px !important; }
      html body .exercise-title-controls button:last-of-type::before { content: '+' !important; font-size: 10px !important; }
    }

    @media (max-width: 430px) {
      html body .assignment-control button:nth-child(1)::before,
      html body .assignment-control button:nth-child(2)::before,
      html body .pdf-lines-toggle::before,
      html body .bar-ribbon-toggle::before,
      html body .download-pdf-button::before,
      html body .panel > button.secondary::before,
      html body .mobile-lang-ar::before,
      html body .mobile-lang-fr::before,
      html body .arabic-toggle-button::before,
      html body .arabic-mode-toggle::before,
      html body button[class*="arabic"]::before,
      html body button[class*="french"]::before,
      html body button[class*="francais"]::before,
      html body button[class*="français"]::before,
      html body button[data-lang="fr"]::before { font-size: 6px !important; }

      html body .preview-pdf-button::before { font-size: 5.4px !important; }
      html body .note-scale-button.active::after { min-width: 12px !important; height: 8px !important; font-size: 4.8px !important; }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('button').forEach(function (button) {
    var label = ((button.textContent || '') + ' ' + (button.getAttribute('aria-label') || '')).trim().toLowerCase();
    if (label.includes('arabe') || label.includes('arabic')) button.classList.add('mobile-lang-ar');
    if (label.includes('français') || label.includes('francais') || label.includes('french') || label === 'fr') button.classList.add('mobile-lang-fr');
  });

  document.querySelectorAll('.page-count-card .compact-control').forEach(function (control) {
    var buttons = control.querySelectorAll('button');
    var value = control.querySelector('strong');
    if (buttons.length < 2 || !value) return;
    if (control.dataset.mobileOrderReady === 'true') return;
    control.insertBefore(buttons[1], value);
    control.appendChild(buttons[0]);
    control.dataset.mobileOrderReady = 'true';
  });
}

applyMobileButtonAbbreviations();
setTimeout(applyMobileButtonAbbreviations, 150);
setTimeout(applyMobileButtonAbbreviations, 600);
setTimeout(applyMobileButtonAbbreviations, 1200);
