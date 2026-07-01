function createEducationNavbar() {
  if (document.querySelector('.education-top-navbar')) return;

  var nav = document.createElement('div');
  nav.className = 'education-top-navbar';
  nav.innerHTML = [
    '<div class="education-brand">',
      '<span class="education-logo education-logo-book">📘</span>',
      '<div class="education-title-wrap">',
        '<strong>A4 Exam</strong>',
        '<span>Educational worksheet maker</span>',
      '</div>',
      '<span class="education-logo education-logo-pencil">✏️</span>',
      '<span class="education-logo education-logo-cap">🎓</span>',
    '</div>'
  ].join('');

  document.body.insertBefore(nav, document.body.firstChild);
}

createEducationNavbar();
setTimeout(createEducationNavbar, 100);
setTimeout(createEducationNavbar, 300);
