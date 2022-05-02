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

let main, h1, mainBody, languageLogo;
const container = document.querySelector('.container');
const nav = container.querySelector('.nav');
const navLanguages = nav.querySelectorAll('.nav-lang');

(function () {
    let url = window.location.href.split('/').pop();
    if (!url) {
        url = 'index.html';
    }
    container.appendChild(createMainContent(url));
    main = document.querySelector('.main');
    h1 = document.querySelector('h1');
    mainBody = main.querySelector('.main-body');
    languageLogo = main.querySelector('.language-logo');
    updateLanguageLogo(url);
    updateSelectedLanguage(url);
    window.addEventListener('popstate', popstate);
    window.history.replaceState(url, '', null);
    nav.addEventListener('click', clickNav);
})();

function createMainContent(url) {
    const h1 = document.createElement('h1');
    h1.classList.add('main-title');
    h1.textContent = states[url].name;

    const p = document.createElement('p');
    p.classList.add('main-body');
    p.textContent = states[url].description;
    
    const main = document.createElement('div');
    main.classList.add('main');
    main.appendChild(h1);
    main.appendChild(p);

    return main;
}

function updatePageContent(url) {
    h1.textContent = states[url].name;
    mainBody.textContent = states[url].description;
    updateLanguageLogo(url);
    updateSelectedLanguage(url);
}

function updateLanguageLogo(url) {
    let languageLogo = main.querySelector('.language-logo');
    if (url === 'index.html') {
        if (languageLogo) {
            main.removeChild(languageLogo);
        }
        h1.classList.remove('language-title');
    } else {
        if (!languageLogo) {
            languageLogo = document.createElement('img');
            languageLogo.alt = 'language logo';
            languageLogo.classList.add('language-logo');
            main.insertBefore(languageLogo, mainBody);
        }
        languageLogo.src = 'img/' + url.split('.')[0] + '.png';
        h1.classList.add('language-title');
    }
}

function updateSelectedLanguage(url) {
    if (url === 'index.html') {
        for (let i = 0; i < navLanguages.length; i++) {
            navLanguages[i].classList.remove('selected');
        }
    } else {
        for (let i = 0; i < navLanguages.length; i++) {
            if (navLanguages[i].getAttribute('href') === url) {
                navLanguages[i].classList.add('selected');
            } else {
                navLanguages[i].classList.remove('selected');
            }
        }
    }
}

function updateWindowTitle(url) {
    if (url === 'index.html') {
        document.title = states['index.html'].name;
    } else {
        document.title = states['index.html'].name + ' - ' + states[url].name;
    }
}

function clickNav(e) {
    if (e.target !== e.currentTarget) {
        e.preventDefault();
        const url = e.target.getAttribute('href').split('/').pop();
        window.history.pushState(url, '', url);
        updatePageContent(url);
        updateWindowTitle(url);
    }
    e.stopPropagation();
}

function popstate(e) {
    updatePageContent(e.state)
}
