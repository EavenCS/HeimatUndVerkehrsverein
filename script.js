$(document).ready(function(){
    // Navbar und Footer laden (wie gehabt)
    $("#navbar").load("components/nav/nav.html", function(response, status, xhr) {
      if(status === "error") {
        console.error("Fehler beim Laden der Navbar: " + xhr.status + " " + xhr.statusText);
      }
    });
    $("#footer").load("components/footer/footer.html");
  
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
  
  