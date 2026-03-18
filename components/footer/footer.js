$(document).ready(function(){
    // Erkenne ob wir im Root oder in einem Unterordner sind
    const path = window.location.pathname;
    const isInPages = path.includes('/pages/');

    // Für GitHub Pages: erkenne Repository-Name im Pfad
    const pathParts = path.split('/').filter(p => p);
    const repoName = pathParts.length > 0 && !pathParts[0].includes('.html') ? pathParts[0] : '';
    const basePrefix = repoName ? '/' + repoName + '/' : '/';

    const footerPath = isInPages ? '../components/footer/footer.html' : (repoName ? basePrefix + 'components/footer/footer.html' : 'components/footer/footer.html');

    console.log('Footer Pfad:', footerPath, 'Repo:', repoName);
    $("#footer").load(footerPath);
  });
  