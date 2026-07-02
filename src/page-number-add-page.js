function preparePageNumberClickToAddPage() {
  document.querySelectorAll('.page-number').forEach(function (node) {
    if (node.dataset.addPageReady === 'true') return;
    node.dataset.addPageReady = 'true';
    node.title = 'Cliquer pour ajouter une nouvelle page';
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
  });
}

preparePageNumberClickToAddPage();
setTimeout(preparePageNumberClickToAddPage, 200);
setTimeout(preparePageNumberClickToAddPage, 700);
