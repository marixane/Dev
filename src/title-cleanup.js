function cleanTitleLabels() {
  document.querySelectorAll('.exercise-title-controls').forEach(function (title) {
    var decorations = title.querySelectorAll('.points-decoration');
    if (decorations.length >= 2) {
      decorations[0].textContent = '(';
      decorations[1].textContent = ')';
    }

    var strong = title.querySelector('strong');
    if (!strong) return;
    var match = (strong.textContent || '').match(/([0-9]+(?:[,.][0-9]+)?)/);
    if (!match) return;
    strong.textContent = match[1].replace('.', ',') + ' Pts';
  });
}

cleanTitleLabels();
setTimeout(cleanTitleLabels, 200);
setTimeout(cleanTitleLabels, 700);

document.addEventListener('click', function (event) {
  if (event.target && event.target.closest && event.target.closest('.exercise-title-controls')) {
    setTimeout(cleanTitleLabels, 80);
  }
});
