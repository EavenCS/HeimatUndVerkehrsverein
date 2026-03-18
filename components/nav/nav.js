$(document).ready(function(){
  // Erkenne ob wir im Root oder in einem Unterordner sind
  const path = window.location.pathname;
  const isInPages = path.includes('/pages/');

  // Für GitHub Pages: erkenne Repository-Name im Pfad
  const pathParts = path.split('/').filter(p => p);
  const repoName = pathParts.length > 0 && !pathParts[0].includes('.html') ? pathParts[0] : '';
  const basePrefix = repoName ? '/' + repoName + '/' : '/';

  let basePath = isInPages ? '../' : (repoName ? basePrefix : './');

  console.log('Pfad:', path, 'In pages:', isInPages, 'BasePath:', basePath, 'Repo:', repoName);

  // Load navigation HTML mit relativem Pfad
  const navPath = isInPages ? '../components/nav/nav.html' : (repoName ? basePrefix + 'components/nav/nav.html' : 'components/nav/nav.html');

  $('#navbar').load(navPath, function(response, status, xhr) {
    if (status === "error") {
      console.error('Navigation konnte nicht geladen werden:', xhr.status, xhr.statusText);
      console.error('Versuchter Pfad:', navPath);
      return;
    }

    console.log('Navigation erfolgreich geladen');

    // Setze Logo-Pfad
    const logoPath = (repoName && !isInPages) ? basePrefix + 'components/nav/hoedeken.png' : basePath + 'components/nav/hoedeken.png';
    $('#logo-img').attr('src', logoPath);
    console.log('Logo Pfad gesetzt:', logoPath);

    // Setze Logo-Link
    const homePath = (repoName && !isInPages) ? basePrefix + 'index.html' : basePath + 'index.html';
    $('#logo-link').attr('href', homePath);

    // Setze Navigation Links basierend auf aktuellem Standort
    $('.nav-group a').each(function() {
      const pageName = $(this).data('page');
      let href;

      if (pageName === 'index.html') {
        href = (repoName && !isInPages) ? basePrefix + 'index.html' : basePath + 'index.html';
      } else {
        if (repoName && !isInPages) {
          href = basePrefix + 'pages/' + pageName;
        } else {
          href = (isInPages ? '' : 'pages/') + pageName;
        }
      }

      $(this).attr('href', href);

      // Markiere aktive Seite
      const currentPage = path.split('/').pop() || 'index.html';
      if (pageName === currentPage || (currentPage === '' && pageName === 'index.html')) {
        $(this).addClass('active');
        console.log('Aktive Seite markiert:', pageName);
      }
    });

    // Hamburger menu toggle - wichtig: mit .off() vorherige Handler entfernen
    $('#hamburger').off('click').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      const nav = $('#nav');
      const isOpen = nav.hasClass('open');

      console.log('Hamburger geklickt - aktuell:', isOpen ? 'offen' : 'geschlossen');

      if (isOpen) {
        nav.removeClass('open');
      } else {
        nav.addClass('open');
      }

      console.log('Nach Toggle:', nav.hasClass('open') ? 'offen' : 'geschlossen');
    });

    // Klick außerhalb des Menüs schließt es
    $(document).on('click', function(e) {
      const nav = $('#nav');
      const hamburger = $('#hamburger');

      // Nur schließen wenn Menü offen ist UND der Klick nicht auf Menü oder Hamburger war
      if (nav.hasClass('open') &&
          !nav.is(e.target) &&
          nav.has(e.target).length === 0 &&
          !hamburger.is(e.target) &&
          hamburger.has(e.target).length === 0) {
        nav.removeClass('open');
        console.log('Menü geschlossen durch außen-Klick');
      }
    });
  });
});
