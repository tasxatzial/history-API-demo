const nav = document.querySelector('.nav');
const navLanguages = nav.querySelectorAll('.nav-lang');
const h1 = document.querySelector('h1');
const main = document.querySelector('.main');
const mainBody = document.querySelector('.main-body');
const languageLogo = document.querySelector('.language-logo');

const states = {
    'index.html': {
        'name': h1.textContent,
        'description':  mainBody.textContent
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

window.history.replaceState('index.html', '', null);

nav.addEventListener('click', clickNav);
window.addEventListener('popstate', popstate);

function updatePageContent(url) {
    h1.textContent = states[url].name;
    console.log(main);
    mainBody.textContent = states[url].description;
    updateLanguageLogo(url);
    updateSelectedLanguage(url);
}

function updateLanguageLogo(url) {
    let logo = main.querySelector('.language-logo');
    if (url === 'index.html') {
        const logo = main.querySelector('.language-logo');
        if (logo) {
            main.removeChild(logo);
        }
        h1.classList.remove('language-title');
    } else {
        const language = url.split('.')[0];
        if (!logo) {
            logo = document.createElement('img');
            logo.alt = 'language logo';
            logo.classList.add('language-logo');
            main.insertBefore(logo, mainBody);
        }
        logo.src = 'img/' + language + '.png';
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