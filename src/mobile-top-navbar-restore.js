function restoreMobileTopNavbar() {
  var existing = document.getElementById('mobile-top-navbar-restore-style');
  if (existing) existing.remove();

  var style = document.createElement('style');
  style.id = 'mobile-top-navbar-restore-style';
  style.textContent = `
    @media (max-width: 1200px) {
      html body .education-top-navbar {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: 38px !important;
        min-height: 38px !important;
        max-height: 38px !important;
        padding: 2px 6px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        align-items: center !important;
        justify-content: space-between !important;
        overflow: hidden !important;
        position: relative !important;
        z-index: 1000 !important;
      }

      html body .education-top-navbar * {
        max-height: 34px !important;
        box-sizing: border-box !important;
      }

      html body .education-top-navbar img,
      html body .education-top-navbar svg {
        max-height: 30px !important;
        width: auto !important;
        object-fit: contain !important;
      }

      html body .education-top-navbar h1,
      html body .education-top-navbar .app-title,
      html body .education-top-navbar .brand-title,
      html body .education-top-navbar span,
      html body .education-top-navbar p {
        font-size: 10px !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      html body .app-shell {
        height: calc(100vh - 38px) !important;
        min-height: calc(100vh - 38px) !important;
        max-height: calc(100vh - 38px) !important;
        grid-template-rows: calc(100vh - 38px) !important;
      }

      html body .panel,
      html body .preview-zone {
        height: calc(100vh - 38px) !important;
        min-height: calc(100vh - 38px) !important;
        max-height: calc(100vh - 38px) !important;
      }
    }

    @media (max-width: 430px) {
      html body .education-top-navbar {
        height: 34px !important;
        min-height: 34px !important;
        max-height: 34px !important;
        padding: 2px 4px !important;
      }

      html body .education-top-navbar img,
      html body .education-top-navbar svg {
        max-height: 26px !important;
      }

      html body .education-top-navbar h1,
      html body .education-top-navbar .app-title,
      html body .education-top-navbar .brand-title,
      html body .education-top-navbar span,
      html body .education-top-navbar p {
        font-size: 8px !important;
      }

      html body .app-shell {
        height: calc(100vh - 34px) !important;
        min-height: calc(100vh - 34px) !important;
        max-height: calc(100vh - 34px) !important;
        grid-template-rows: calc(100vh - 34px) !important;
      }

      html body .panel,
      html body .preview-zone {
        height: calc(100vh - 34px) !important;
        min-height: calc(100vh - 34px) !important;
        max-height: calc(100vh - 34px) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

restoreMobileTopNavbar();
setTimeout(restoreMobileTopNavbar, 150);
setTimeout(restoreMobileTopNavbar, 650);
setTimeout(restoreMobileTopNavbar, 1300);
setTimeout(restoreMobileTopNavbar, 1800);
