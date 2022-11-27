import { languagesData } from './data.js'

let main, mainText, header, h1;
const nav = document.querySelector('.nav');
const languageNavLinks = nav.querySelectorAll('.nav-lang');

/* Initializes the page based on the initial URL */
(function () {
    createMainContent();
    let url = window.location.href.split('/').pop();
    if (!url) {
        url = 'index.html';
    }
    updatePage(url);
    window.addEventListener('popstate', popstate);
    window.history.replaceState(url, '', null);
    nav.addEventListener('click', clickNav);
})();

/**
 * Initializes everything on the page except the navigation links.
 * Called when:
 * 1) the page loads for the first time.
 */
function createMainContent() {
    h1 = document.createElement('h1');
    h1.classList.add('main-title');

    mainText = document.createElement('p');
    mainText.classList.add('language-info');
    
    header = document.createElement('header');
    header.appendChild(h1);

    main = document.createElement('div');
    main.classList.add('main');
    main.tabIndex = '-1';
    main.appendChild(header);
    main.appendChild(mainText);

    const container = document.querySelector('.container');
    container.appendChild(main);
}

/**
 * Updates the page. Called when:
 * 1) a navigation link is clicked.
 * 2) the page loads for the first time.
 * 3) the browser back/forward button is clicked.
 */
function updatePage(url) {
    h1.textContent = languagesData[url].name;
    mainText.textContent = languagesData[url].description;
    updateLanguageLogo(url);
    updateSelectedNavLink(url);
}

/**
 * Updates the language logo. Called when:
 * 1) a navigation link is clicked.
 * 2) the page loads for the first time.
 * 3) the browser back/forward button is clicked.
 */
function updateLanguageLogo(url) {
    let languageLogo = header.querySelector('.language-logo');
    if (url === 'index.html') {
        if (languageLogo) {
            header.removeChild(languageLogo);
        }
        h1.classList.remove('language-title');
    } else {
        if (!languageLogo) {
            languageLogo = document.createElement('img');
            languageLogo.alt = 'language logo';
            languageLogo.classList.add('language-logo');
            header.appendChild(languageLogo);
        }
        languageLogo.src = 'img/' + url.split('.')[0] + '.png';
        h1.classList.add('language-title');
    }
}

/**
 * Updates the selected navigation link. Called when:
 * 1) a navigation link is clicked.
 * 2) the page loads for the first time.
 * 3) the browser back/forward button is clicked.
 */
function updateSelectedNavLink(url) {
    if (url === 'index.html') {
        for (let i = 0; i < languageNavLinks.length; i++) {
            languageNavLinks[i].classList.remove('selected');
        }
    } else {
        for (let i = 0; i < languageNavLinks.length; i++) {
            if (languageNavLinks[i].getAttribute('href') === url) {
                languageNavLinks[i].classList.add('selected');
            } else {
                languageNavLinks[i].classList.remove('selected');
            }
        }
    }
}

/**
 * Updates the window title. Called when:
 * 1) a navigation link is clicked.
 */
function updateWindowTitle(url) {
    if (url === 'index.html') {
        document.title = languagesData['index.html'].name;
    } else {
        document.title = languagesData['index.html'].name + ' - ' + languagesData[url].name;
    }
}

/**
 * Updates the page. Called when:
 * 1) a navigation link is clicked.
 */
function clickNav(e) {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const url = e.target.getAttribute('href').split('/').pop();
        window.history.pushState(url, '', url);
        main.focus();
        updatePage(url);
        updateWindowTitle(url);
    }
}

/**
 * Updates the page. Called when:
 * 1) the browser back/forward button is clicked.
 */
function popstate(e) {
    updatePage(e.state)
}
