const states = {
    'index.html': {
        'name': 'Languages',
        'description': 'A programming language is any set of rules that converts strings, or graphical program elements in the case of visual programming languages, to various kinds of machine code output. Programming languages are one kind of computer language, and are used in computer programming to implement algorithms.'
    },
    'javascript.html': {
        'name': 'JavaScript',
        'logo': 'img/javascript.png',
        'description': 'JavaScript often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users\' devices.'
    },
    'python.html': {
        'name': 'Python',
        'logo': 'img/python.png',
        'description': 'Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small- and large-scale projects.'
    },
    'c++.html': {
        'name': 'C++',
        'logo': 'img/c++.png',
        'description': 'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". The language has expanded significantly over time, and modern C++ now has object-oriented, generic, and functional features in addition to facilities for low-level memory manipulation.'
    }
};

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
    h1.textContent = states[url].name;
    mainText.textContent = states[url].description;
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
        document.title = states['index.html'].name;
    } else {
        document.title = states['index.html'].name + ' - ' + states[url].name;
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
