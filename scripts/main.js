const visualData = document.getElementById('container__datos');
const buscar = document.querySelector('.fa-search');
const template = document.getElementById('template__data').content;
const fragment = document.createDocumentFragment();
const personajes = document.getElementById('personajes');
const comics = document.getElementById('comics');
const historias = document.getElementById('historias');
const input = document.getElementById('input');
const warning = document.getElementById('container__warning');
const container = document.querySelector('.container');
const menu = document.getElementById('menu');

let data = [];

const hideWarning = () => {
  setTimeout(function () {
    warning.style.opacity = 0;    
  }, 2000)
}

const showBorder = () => {
  setTimeout( function () {
    input.classList.add('container_buscar-input-border-red');
  }, 1000);  
}

const hideBorder = () => {
  setTimeout( function () {
    input.classList.remove('container_buscar-input-border-red');
  }, 4000);  
}

const emptyInput = () => {
  input.value = '';
}

const emptyVisualData = () => {
  visualData.innerHTML = '';
}

const validar = () => {
  let isValid = false;
  if (input.value === '') {
    warning.innerHTML = 'Write the data to search! 🙂';
    warning.style.opacity = 1;
    showBorder();    
    hideBorder();
    hideWarning();    
    isValid = true;
  } 
  return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
  input.classList.add('characters');
  getDatosCharactersAll();
})

personajes.addEventListener('click', (e) => {
  input.classList.add('characters');
  input.classList.remove('comics');
  e.preventDefault();
  input.placeholder = 'Enter characters name';
  getDatosCharactersAll();
  emptyInput();
  if(menu.checked === true){
    menu.checked = false;
  }
})

comics.addEventListener('click', (e) => {
  input.classList.remove('characters');
  input.classList.add('comics');
  e.preventDefault();
  input.placeholder = 'Enter comics name';
  getDatosComicsAll();
  emptyInput();
  if(menu.checked === true){
    menu.checked = false;
  }
})

buscar.addEventListener('click', (e) => {
  if (validar()) {
    return;
  }else{
  if (input.classList.contains('characters')) {
    getDatosCharactersSearch(e);
  } else if (input.classList.contains('comics')) {
    getDatosComicsSearch(e);    
  } else console.log('opcion')
}
})

const getDatosCharactersAll = async (url) => {
  const reponseAll = await fetch(
    'https://gateway.marvel.com/v1/public/characters?&ts=1000&apikey=9847ba321d9ea97d6a6333c47e871814&hash=c6a0a81113a11575c38c31afcffd0d34',
  )
  const resultAll = await reponseAll.json();
  let marvelAll = resultAll;
  let dataAll = marvelAll.data.results;
  emptyVisualData();
  paintDataCharacters(dataAll);
}

const getDatosComicsAll = async (url) => {
  const reponseAll = await fetch(
    'https://gateway.marvel.com/v1/public/comics?&ts=1000&apikey=9847ba321d9ea97d6a6333c47e871814&hash=c6a0a81113a11575c38c31afcffd0d34',
  );
  const resultAll = await reponseAll.json();
  let marvelAll = resultAll;
  let dataAll = marvelAll.data.results;
  emptyVisualData();
  paintDataComics(dataAll);
}

const getDatosCharactersSearch = async (url) => {
  const reponseSearch = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input.value}&ts=1000&apikey=9847ba321d9ea97d6a6333c47e871814&hash=c6a0a81113a11575c38c31afcffd0d34`,
  );
  const result = await reponseSearch.json();
  let marvelSearch = result;
  let dataSearch = marvelSearch.data.results;
  container.style.height = 'auto';
  if (dataSearch.length === 0) {
    warning.style.opacity = 1;
    container.style.height = '94.5vh';
    warning.innerHTML = 'No results found 😵';
    hideWarning();
  }  
  emptyVisualData();
  paintDataCharacters(dataSearch);
}

const getDatosComicsSearch = async (url) => {
  const reponseSearch = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${input.value}&ts=1000&apikey=9847ba321d9ea97d6a6333c47e871814&hash=c6a0a81113a11575c38c31afcffd0d34`,
  );
  const result = await reponseSearch.json();
  let marvelSearch = result;
  let dataSearch = marvelSearch.data.results;
  container.style.height = 'auto';
  if (dataSearch.length === 0) {
    warning.style.opacity = 1;
    container.style.height = '94.5vh';
    warning.innerHTML = 'No results found 😵';
    hideWarning();
  }  
  emptyVisualData();
  paintDataComics(dataSearch);
}

const paintDataCharacters = (data) => {
  for (let i = 0; i < 10; i++) {
    const clone = template.cloneNode(true);
    clone.querySelector('.article__data-nombre').textContent = data[i]['name'];
    if (data[i]['description'] === '') {
      clone.querySelector('.article__data-descripcion').textContent =
        'It does not have a description 😵';
    } else {
      clone.querySelector('.article__data-descripcion').textContent =
        data[i]['description'];
    }
    clone.querySelector('.article__data-imagen').src =
      data[i]['thumbnail']['path'] + '.jpg';
    fragment.appendChild(clone);
  }
  visualData.appendChild(fragment);
}

const paintDataComics = (data) => {
  for (let i = 0; i < 10; i++) {
    const clone = template.cloneNode(true);
    clone.querySelector('.article__data-nombre').textContent = data[i]['title'];
    if (data[i]['description'] === '' || data[i]['description'] === null) {
      clone.querySelector('.article__data-descripcion').textContent =
        'It does not have a description 😵';
    } else {
      clone.querySelector('.article__data-descripcion').textContent =
        data[i]['description'];
    }
    clone.querySelector('.article__data-imagen').src =
      data[i]['thumbnail']['path'] + '.jpg';
    fragment.appendChild(clone);
  }
  visualData.appendChild(fragment);
}

