import languagesData from './data.js'

const h1 = document.querySelector('h1');
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const mainText = document.querySelector('.main-text');
const languageLogo = document.querySelector('.language-logo');
const languageNavLinks = nav.querySelectorAll('.nav-link-language');


(function () {
    const currentUrl = window.location.href.split('/').pop() || 'index.html';
    window.addEventListener('popstate', (e) => loadPageContent(e.state));
    window.history.replaceState(currentUrl, '', null);
    nav.addEventListener('click', clickNav);
    loadPageContent(currentUrl);
})();

function loadPageContent(url) {
    updateMain(url);
    updateNav(url);
}

function updateMain(url) {
    h1.textContent = languagesData[url].name;
    mainText.textContent = languagesData[url].description;
    if (url === 'index.html') {
        languageLogo.src = "#";
        languageLogo.style.display = "none";
        h1.classList.remove('language-title');
    } else {
        languageLogo.style.display = "block";
        languageLogo.src = 'img/' + url.split('.')[0] + '.png';
        h1.classList.add('language-title');
    }
}

function updateNav(url) {
    for (let i = 0; i < languageNavLinks.length; i++) {
        if (languageNavLinks[i].getAttribute('href') === url) {
            languageNavLinks[i].classList.add('selected');
        } else {
            languageNavLinks[i].classList.remove('selected');
        }
    }
}

function updateDocumentTitle(url) {
    let documentTitle = languagesData['index.html'].name;
    if (url !== 'index.html') {
        documentTitle += ' - ' + languagesData[url].name;
    }
    document.title = documentTitle;
}

function clickNav(e) {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const selectedUrl = e.target.getAttribute('href').split('/').pop();
        window.history.pushState(selectedUrl, '', selectedUrl);
        loadPageContent(selectedUrl);
        updateDocumentTitle(selectedUrl);
        main.focus();
    }
}
