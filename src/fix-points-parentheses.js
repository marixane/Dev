function isFreeHomeworkTitle() {
  var title = document.querySelector('.title-line-top');
  var value = String((title && (title.value || title.textContent)) || '').toLowerCase();
  return value.indexOf('devoir libre') !== -1 || value.indexOf('devoir à la maison') !== -1 || value.indexOf('devoir a la maison') !== -1;
}

function cleanFreeHomeworkExerciseTitles() {
  if (!isFreeHomeworkTitle()) return;

  document.querySelectorAll('.exercise-title-controls').forEach(function (title) {
    var label = title.querySelector('span:not(.points-decoration)');
    if (!label) return;

    Array.from(title.childNodes).forEach(function (node) {
      if (node !== label && node.nodeType === Node.TEXT_NODE) node.textContent = '';
    });

    label.textContent = 'Exercice :';
    title.querySelectorAll('button, strong, .points-decoration').forEach(function (node) {
      node.textContent = '';
      node.style.display = 'none';
      node.style.visibility = 'hidden';
      node.style.width = '0';
      node.style.minWidth = '0';
      node.style.maxWidth = '0';
      node.style.margin = '0';
      node.style.padding = '0';
      node.style.border = '0';
      node.style.overflow = 'hidden';
    });
  });
}

function fixExercisePointParentheses() {
  if (isFreeHomeworkTitle()) {
    cleanFreeHomeworkExerciseTitles();
    return;
  }

  document.querySelectorAll('.exercise-title-controls').forEach(function (title) {
    title.querySelectorAll('button, strong, .points-decoration').forEach(function (node) {
      node.style.display = '';
      node.style.visibility = '';
      node.style.width = '';
      node.style.minWidth = '';
      node.style.maxWidth = '';
      node.style.margin = '';
      node.style.padding = '';
      node.style.border = '';
      node.style.overflow = '';
    });
    var spans = title.querySelectorAll('.points-decoration');
    if (spans.length >= 2) {
      if (spans[0].textContent !== '(') spans[0].textContent = '(';
      if (spans[1].textContent !== ')') spans[1].textContent = ')';
    }
  });
}

fixExercisePointParentheses();
setTimeout(fixExercisePointParentheses, 100);
setTimeout(fixExercisePointParentheses, 400);
setInterval(fixExercisePointParentheses, 300);

new MutationObserver(function () {
  fixExercisePointParentheses();
}).observe(document.body, { childList: true, subtree: true, characterData: true });
