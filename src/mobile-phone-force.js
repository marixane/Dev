function applyMobilePhoneForce() {
  var existing = document.getElementById('mobile-phone-force-style');
  if (existing) existing.remove();

  var style = document.createElement('style');
  style.id = 'mobile-phone-force-style';
  style.textContent = `
    @media (max-width: 1200px) {
      html,
      body,
      #root {
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
      }

      body .education-top-navbar {
        display: none !important;
      }

      body .app-shell {
        width: 100vw !important;
        height: 100vh !important;
        min-width: 100vw !important;
        max-width: 100vw !important;
        min-height: 100vh !important;
        max-height: 100vh !important;
        display: grid !important;
        grid-template-columns: 11vw 89vw !important;
        grid-template-rows: 100vh !important;
        gap: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        flex-direction: initial !important;
        flex-wrap: initial !important;
        align-items: stretch !important;
      }

      body .panel {
        grid-column: 1 !important;
        width: 11vw !important;
        min-width: 11vw !important;
        max-width: 11vw !important;
        flex: 0 0 11vw !important;
        flex-basis: 11vw !important;
        height: 100vh !important;
        min-height: 100vh !important;
        max-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 5px !important;
        padding: 6px 2px !important;
        margin: 0 !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        box-sizing: border-box !important;
        border-radius: 0 !important;
        border-right: 1px solid #cbd5e1 !important;
        background: #ffffff !important;
        box-shadow: none !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        top: auto !important;
        transform: none !important;
        scale: 1 !important;
      }

      body .panel::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }

      body .page-date-control,
      body .page-date-picker,
      body .page-date-title,
      body .page-date-input,
      body .page-date-toggle,
      body .page-date-toggle-button,
      body .panel .eyebrow,
      body .panel h1,
      body .panel .intro,
      body .panel .form-group > label,
      body .exercise-count-section h2,
      body .note-scale-title,
      body .note-scale-counter,
      body .page-count-card label {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
      }

      body .panel .form-group,
      body .assignment-control,
      body .note-scale-control,
      body .note-scale-buttons,
      body .exercise-count-section,
      body .page-count-grid,
      body .page-count-card,
      body .page-count-card .compact-control {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        margin: 0 auto !important;
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 5px !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        box-sizing: border-box !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        transform: none !important;
      }

      body .panel button,
      body .assignment-control button,
      body .note-scale-button,
      body .pdf-lines-toggle,
      body .bar-ribbon-toggle,
      body .panel > button:not(.pdf-lines-toggle):not(.bar-ribbon-toggle),
      body .page-count-card .compact-control button {
        width: 26px !important;
        min-width: 26px !important;
        max-width: 26px !important;
        height: 26px !important;
        min-height: 26px !important;
        padding: 0 !important;
        margin: 0 auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        align-self: center !important;
        border-radius: 8px !important;
        font-size: 0 !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        transform: none !important;
      }

      body .panel button::before,
      body .assignment-control button::before,
      body .note-scale-button::before,
      body .pdf-lines-toggle::before,
      body .bar-ribbon-toggle::before,
      body .page-count-card .compact-control button::before {
        position: static !important;
        width: auto !important;
        height: auto !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        font-size: 12px !important;
        font-weight: 900 !important;
        color: currentColor !important;
        line-height: 1 !important;
      }

      body .assignment-control button:nth-child(1)::before { content: 'I' !important; }
      body .assignment-control button:nth-child(2)::before { content: 'M' !important; }
      body .note-scale-button:nth-child(1)::before { content: '10' !important; font-size: 10px !important; }
      body .note-scale-button:nth-child(2)::before { content: '20' !important; font-size: 10px !important; }
      body .pdf-lines-toggle::before { content: 'L' !important; }
      body .bar-ribbon-toggle::before { content: 'Pts' !important; font-size: 8px !important; }
      body .pdf-lines-toggle::after,
      body .bar-ribbon-toggle::after { content: '' !important; display: none !important; }

      body .page-count-card .compact-control strong {
        width: 26px !important;
        min-width: 26px !important;
        max-width: 26px !important;
        height: 20px !important;
        line-height: 20px !important;
        padding: 0 !important;
        margin: 0 auto !important;
        border-radius: 6px !important;
        font-size: 10px !important;
        align-self: center !important;
        box-sizing: border-box !important;
      }

      body .page-count-card .compact-control strong::after { content: '' !important; display: none !important; }
      body .page-count-card .compact-control button:first-child::before { content: '-' !important; }
      body .page-count-card .compact-control button:last-child::before { content: '+' !important; }
      body .panel > button.secondary::before { content: 'PDF' !important; font-size: 8px !important; }

      body .preview-zone {
        grid-column: 2 !important;
        width: 89vw !important;
        min-width: 89vw !important;
        max-width: 89vw !important;
        flex: 0 0 89vw !important;
        flex-shrink: 1 !important;
        height: 100vh !important;
        min-height: 100vh !important;
        max-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        justify-items: start !important;
        gap: 6px !important;
        padding: 8px 0 40px 5px !important;
        margin: 0 !important;
        overflow: auto !important;
        box-sizing: border-box !important;
        background: #e8edf4 !important;
        border-left: 0 !important;
        transform: none !important;
      }

      body .preview-zone .a4-page,
      body .a4-page {
        transform: scale(0.52) !important;
        transform-origin: top left !important;
        margin: 0 0 -525px 0 !important;
        flex: 0 0 auto !important;
        translate: 0 0 !important;
      }

      body .preview-zone .a4-page:last-child,
      body .a4-page:last-child {
        margin-bottom: 40px !important;
      }
    }

    @media (max-width: 430px) {
      html,
      body,
      #root {
        overflow: hidden !important;
      }

      body .app-shell {
        grid-template-columns: 12vw 88vw !important;
      }

      body .panel {
        width: 12vw !important;
        min-width: 12vw !important;
        max-width: 12vw !important;
        flex-basis: 12vw !important;
        padding: 5px 1px !important;
        gap: 4px !important;
        align-items: center !important;
      }

      body .panel button,
      body .assignment-control button,
      body .note-scale-button,
      body .pdf-lines-toggle,
      body .bar-ribbon-toggle,
      body .panel > button:not(.pdf-lines-toggle):not(.bar-ribbon-toggle),
      body .page-count-card .compact-control button,
      body .page-count-card .compact-control strong {
        width: 22px !important;
        min-width: 22px !important;
        max-width: 22px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      body .panel button,
      body .assignment-control button,
      body .note-scale-button,
      body .pdf-lines-toggle,
      body .bar-ribbon-toggle,
      body .panel > button:not(.pdf-lines-toggle):not(.bar-ribbon-toggle),
      body .page-count-card .compact-control button {
        height: 22px !important;
        min-height: 22px !important;
        border-radius: 7px !important;
      }

      body .panel button::before,
      body .assignment-control button::before,
      body .note-scale-button::before,
      body .pdf-lines-toggle::before,
      body .bar-ribbon-toggle::before,
      body .page-count-card .compact-control button::before {
        font-size: 10px !important;
      }

      body .note-scale-button:nth-child(1)::before,
      body .note-scale-button:nth-child(2)::before {
        font-size: 9px !important;
      }

      body .bar-ribbon-toggle::before,
      body .panel > button.secondary::before {
        font-size: 7px !important;
      }

      body .preview-zone {
        width: 88vw !important;
        min-width: 88vw !important;
        max-width: 88vw !important;
        padding: 6px 0 50px 4px !important;
        gap: 5px !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
      }

      body .preview-zone .a4-page,
      body .a4-page {
        transform: scale(0.42) !important;
        transform-origin: top left !important;
        margin: 0 0 -650px 0 !important;
      }

      body .preview-zone .a4-page:last-child,
      body .a4-page:last-child {
        margin-bottom: 50px !important;
      }
    }

    @media (max-width: 360px) {
      body .app-shell {
        grid-template-columns: 13vw 87vw !important;
      }

      body .panel {
        width: 13vw !important;
        min-width: 13vw !important;
        max-width: 13vw !important;
        flex-basis: 13vw !important;
      }

      body .preview-zone {
        width: 87vw !important;
        min-width: 87vw !important;
        max-width: 87vw !important;
      }

      body .panel button,
      body .assignment-control button,
      body .note-scale-button,
      body .pdf-lines-toggle,
      body .bar-ribbon-toggle,
      body .panel > button:not(.pdf-lines-toggle):not(.bar-ribbon-toggle),
      body .page-count-card .compact-control button,
      body .page-count-card .compact-control strong {
        width: 21px !important;
        min-width: 21px !important;
        max-width: 21px !important;
      }

      body .panel button,
      body .assignment-control button,
      body .note-scale-button,
      body .pdf-lines-toggle,
      body .bar-ribbon-toggle,
      body .panel > button:not(.pdf-lines-toggle):not(.bar-ribbon-toggle),
      body .page-count-card .compact-control button {
        height: 21px !important;
        min-height: 21px !important;
      }

      body .preview-zone .a4-page,
      body .a4-page {
        transform: scale(0.39) !important;
        margin-bottom: -685px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

applyMobilePhoneForce();
setTimeout(applyMobilePhoneForce, 100);
setTimeout(applyMobilePhoneForce, 500);
setTimeout(applyMobilePhoneForce, 1000);
