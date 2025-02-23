$(document).ready(function(){
  $('#hamburger').click(function(){
    console.log("Hamburger wurde geklickt"); // Debug
    $('#nav').toggleClass('open');
  });
});
