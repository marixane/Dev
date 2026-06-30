function cleanExercisePointTitles() {
  document.querySelectorAll('.exercise-title-controls').forEach(function (title) {
    var decorations = title.querySelectorAll('.points-decoration');
    if (decorations.length >= 2) {
      if (decorations[0].textContent !== '(') decorations[0].textContent = '(';
      if (decorations[1].textContent !== ')') decorations[1].textContent = ')';
    }

    var strong = title.querySelector('strong');
    if (!strong) return;

    var match = (strong.textContent || '').match(/([0-9]+(?:[,.][0-9]+)?)/);
    if (!match) return;

    var numberText = match[1].replace('.', ',');
    var next = numberText + ' Pts';
    if (strong.textContent !== next) strong.textContent = next;
  });
}

cleanExercisePointTitles();
setTimeout(cleanExercisePointTitles, 200);
setTimeout(cleanExercisePointTitles, 700);

document.addEventListener('click', function (event) {
  if (event.target && event.target.closest && event.target.closest('.exercise-title-controls')) {
    setTimeout(cleanExercisePointTitles, 80);
  }
});

window.cleanExercisePointTitles = cleanExercisePointTitles;
