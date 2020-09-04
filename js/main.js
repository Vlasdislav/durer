const COUNT_CARD = 8;

const facadeFasteners = document.querySelector('.facade-fasteners'),
      brackets = document.querySelector('.brackets'),
      fastenersAccordingToDrawings = document.querySelector('.fasteners-according-to-drawings'),
      openContentHref = document.querySelector('.open-content-href'),
      cardBlock = document.querySelector('.card'),
      contentSection = document.querySelector('.content-section'),
      appeal = document.querySelectorAll('#appeal'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      field = document.querySelector('.field'),
      kara = document.querySelector('.kara'),
      menu = document.querySelector('.menu'),
      burger = document.querySelector('.burger');

let count_1 = 0, count_2 = 0, count_3 = 0;

kara.addEventListener('click', () => {
    menu.classList.toggle('is-open');
    burger.classList.toggle('is-open');
});

toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
}

appeal[0].addEventListener('click', () => {
    toggleModalAuth();
});

appeal[appeal.length - 1].addEventListener('click', () => {
    toggleModalAuth();
});

closeAuth.addEventListener('click', () => {
    field.value = '';
    toggleModalAuth();
})

const getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);

    return await response.json();
}

const createCardFacadeFasteners = (data) => {
    const {
        id,
        tag,
        name,
        description,
        image
    } = data;

    const card = 
            `<div class="card" id="${id}" data-index-number="${++count_1}">
                <div class="card-tag">${tag}</div>
                <img class="card-pic" src="${image}" alt="img">
                <div class="about">
                    <span class="card-title">${name}</span>
                    <span class="card-description">${description} </span>
                </div>
            </div>
            <!-- /.card -->
            `;

    facadeFasteners.insertAdjacentHTML('beforeend', card);
}

getData('./db/facade-fasteners.json').then((data) => {
    /*data.forEach(createCardFacadeFasteners);*/

    for (let i = 0; i < COUNT_CARD; ++i)
        createCardFacadeFasteners(data[i]); 
});

const createCardBrackets = (data) => {
    const {
        id,
        tag,
        name,
        description,
        image
    } = data;

    const card = 
            `<div class="card" id="${id}" data-index-number="${++count_2}">
                <div class="card-tag">${tag}</div>
                <img class="card-pic" src="${image}" alt="img">
                <div class="about">
                    <span class="card-title">${name}</span>
                    <span class="card-description">${description} </span>
                </div>
            </div>
            <!-- /.card -->
            `;

    brackets.insertAdjacentHTML('beforeend', card);
}

getData('./db/brackets.json').then((data) => {
    /*data.forEach(createCardBrackets);*/
    
    for (let i = 0; i < COUNT_CARD; ++i)
        createCardBrackets(data[i]);
});

const createCardFastenersAccordingToDrawings = (data) => {
    const {
        id,
        tag,
        name,
        description,
        image
    } = data;
    
    const card = 
            `<div class="card" id="${id}" data-index-number="${++count_3}">
                <div class="card-tag">${tag}</div>
                <img class="card-pic" src="${image}" alt="img">
                <div class="about">
                    <span class="card-title">${name}</span>
                    <span class="card-description">${description} </span>
                </div>
            </div>
            <!-- /.card -->
            `;

    fastenersAccordingToDrawings.insertAdjacentHTML('beforeend', card);
}

getData('./db/fasteners-according-to-drawings.json').then((data) => {
    /*data.forEach(createCardFastenersAccordingToDrawings);*/

    for (let i = 0; i < COUNT_CARD; ++i)
        createCardFastenersAccordingToDrawings(data[i]);
});

const cardsOpen = () => {
    let str = openContentHref.id;
        str = str.replace('#', '');

    getData(`./db/${str}.json`).then((data) => {
        for (let i = COUNT_CARD; i < data.length; ++i) {
            if (str === 'facade-fasteners')
                createCardFacadeFasteners(data[i]);
            if (str === 'brackets')
                createCardBrackets(data[i]);
            if (str === 'fasteners-according-to-drawings')
                createCardFastenersAccordingToDrawings(data[i]);
        }
    });
    openContentHref.textContent = 'Скрыть';
}

const cardsClose = () => {
    let str = openContentHref.id;
        str = str.replace('#', '');

        document.querySelectorAll(`#${str}`).forEach((elem) => {
            if (elem.dataset.indexNumber > COUNT_CARD)
                elem.style.display = 'none';
        });        
        openContentHref.textContent = 'Показать все';
}

document.querySelectorAll('.btn-section').forEach((item) => {
    item.addEventListener('click', (elem) => {
        elem.preventDefault();  

        cardsClose();

        const id = elem.target.getAttribute('href');
        openContentHref.id = id;

        document.querySelectorAll('.btn-section').forEach((child) => {
            child.classList.remove('active');
        });

        document.querySelectorAll('.content-section').forEach((child) => {
            child.classList.remove('visible');
        });

        item.classList.add('active');
        document.querySelector(id).classList.add('visible');
    });
});

openContentHref.addEventListener('click', (event) => {
    event.preventDefault(); 
    
    if (openContentHref.textContent === 'Показать все')
        cardsOpen();
    else if (openContentHref.textContent === 'Скрыть')
        cardsClose();
});