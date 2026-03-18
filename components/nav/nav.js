$(document).ready(function(){
  // Load navigation HTML
  $('#navbar').load('/components/nav/nav.html', function() {
    console.log('Navigation geladen');

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
