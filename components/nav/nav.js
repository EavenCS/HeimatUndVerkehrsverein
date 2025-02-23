$(document).ready(function(){
  $('#hamburger').click(function(){
    console.log("Hamburger wurde geklickt"); // Debug-Ausgabe
    $('#nav').toggleClass('open');
  });
});
