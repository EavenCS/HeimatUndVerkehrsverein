$(document).ready(function(){
  // Erkenne ob wir im Root oder in einem Unterordner sind
  const path = window.location.pathname;
  const isInPages = path.includes('/pages/');
  const basePath = isInPages ? '../' : './';

  console.log('Pfad:', path, 'In pages:', isInPages, 'BasePath:', basePath);

  // Load navigation HTML mit relativem Pfad
  const navPath = isInPages ? '../components/nav/nav.html' : 'components/nav/nav.html';

  $('#navbar').load(navPath, function() {
    console.log('Navigation geladen');

    // Setze Logo-Pfad
    const logoPath = basePath + 'components/nav/hoedeken.png';
    $('#logo-img').attr('src', logoPath);

    // Setze Logo-Link
    const homePath = basePath + 'index.html';
    $('#logo-link').attr('href', homePath);

    // Setze Navigation Links basierend auf aktuellem Standort
    $('.nav-group a').each(function() {
      const pageName = $(this).data('page');
      let href;

      if (pageName === 'index.html') {
        href = basePath + 'index.html';
      } else {
        href = (isInPages ? '' : 'pages/') + pageName;
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
