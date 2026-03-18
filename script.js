$(document).ready(function(){
    // Erkenne ob wir im Root oder in einem Unterordner sind
    const path = window.location.pathname;
    const isInPages = path.includes('/pages/');

    // Für GitHub Pages: erkenne Repository-Name im Pfad
    const pathParts = path.split('/').filter(p => p);
    const repoName = pathParts.length > 0 && !pathParts[0].includes('.html') ? pathParts[0] : '';
    const basePrefix = repoName ? '/' + repoName + '/' : '/';

    const navPath = isInPages ? '../components/nav/nav.html' : (repoName ? basePrefix + 'components/nav/nav.html' : 'components/nav/nav.html');
    const footerPath = isInPages ? '../components/footer/footer.html' : (repoName ? basePrefix + 'components/footer/footer.html' : 'components/footer/footer.html');

    // Navbar und Footer laden
    $("#navbar").load(navPath, function(response, status, xhr) {
      if(status === "error") {
        console.error("Fehler beim Laden der Navbar: " + xhr.status + " " + xhr.statusText);
      }
    });
    $("#footer").load(footerPath);
  
    // Image Slider im Hero-Bereich
    var $slides = $('.slider img');
    var currentIndex = 0;
    var slideCount = $slides.length;
    var slideInterval = 5000; // 5000ms = 5 Sekunden
  
    // Zeige das erste Bild
    $slides.eq(currentIndex).addClass('active').fadeIn(1000);
  
    function nextSlide() {
      $slides.eq(currentIndex).fadeOut(1000, function() {
        $(this).removeClass('active');
        currentIndex = (currentIndex + 1) % slideCount;
        $slides.eq(currentIndex).fadeIn(1000).addClass('active');
      });
    }
  
    // Starte den Slider
    setInterval(nextSlide, slideInterval);
  });
  
  