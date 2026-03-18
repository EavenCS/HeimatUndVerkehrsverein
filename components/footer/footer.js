$(document).ready(function(){
    // Erkenne ob wir im Root oder in einem Unterordner sind
    const path = window.location.pathname;
    const isInPages = path.includes('/pages/');
    const footerPath = isInPages ? '../components/footer/footer.html' : 'components/footer/footer.html';

    console.log('Footer Pfad:', footerPath);
    $("#footer").load(footerPath);
  });
  