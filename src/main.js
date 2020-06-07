/* eslint-disable no-undef */
import {
  filterChampions, sortAlphabet, searchHero, dataChart,
} from './data.js';
import data from './data/lol/lol.js';

/* Buttons navbar */
const home = document.getElementById('home');
const championsLink = document.getElementById('champions');
const final = document.getElementById('final');
/* Screens */
const homeScreen = document.getElementById('home-screen');
const championsScreen = document.getElementById('champions-screen');
const statisticsScreen = document.getElementById('final-screen');
/* Other containers */
const containerHero = document.getElementById('container-hero');
const championSelect = document.getElementById('champions');
const orderSelect = document.getElementById('order');
const searchInput = document.getElementById('search-name');
const totalContainer = document.getElementById('total-container');
const modal = document.getElementById('myModal');
const modalContent = document.getElementById('modal-content');

// Preparing data
const dataLol = Object.values(data.data);

/* Change screens */
home.addEventListener('click', () => {
  homeScreen.classList.remove('hide');
  championsScreen.classList.add('hide');
  searchInput.classList.add('hide');
  statisticsScreen.classList.add('hide');
});
championsLink.addEventListener('click', () => {
  championsScreen.classList.remove('hide');
  searchInput.classList.remove('hide');
  homeScreen.classList.add('hide');
  statisticsScreen.classList.add('hide');
});
final.addEventListener('click', () => {
  statisticsScreen.classList.remove('hide');
  championsScreen.classList.add('hide');
  searchInput.classList.add('hide');
  homeScreen.classList.add('hide');
});

/* Template tags of cards */
const createTags = (arrayTags) => {
  let tmp = `
   <ul class="tags-list">`;
  arrayTags.forEach((tag) => {
    tmp += `<li>${tag}</li>`;
  });
  tmp += '</ul>';
  return tmp;
};

/* Template cards */
const createCards = (dataHeroes) => {
  let template = '';
  dataHeroes.forEach((el) => {
    template += `
      <div class="pCard_card" id="${el.key}">
        <div class="pCard_up" id="${el.key}">
          <img class="pCard_img"  id="${el.key}" src=${el.splash}>
          <div class="pCard_text" id="${el.key}">
            <h2>${el.id}</h2>
            <p>${el.title.toUpperCase()}</p>
          </div>
          <div class="pCard_down" id="${el.key}">
           ${el.tags ? createTags(el.tags) : ''}
          </div>
        </div>
      </div>
    `;
  });
  return template;
};

/* Show cards in main screen */
containerHero.innerHTML = createCards(dataLol);
totalContainer.innerHTML = `Total: ${dataLol.length}`;

/* Fill table of modal */
const fillTable = (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  let t = '';
  values.forEach((value, index) => {
    t += `
      <tr>
        <td id="test" class="key-style">${keys[index]}</td>
        <td id="test" class="value-style">${value}</td>
      </tr>
      `;
  });
  return t;
};

/* Fill progress bar in modal */
const progreStats = (objInfo) => {
  let tmp = '';
  const arrayInfo = Object.entries(objInfo);
  arrayInfo.forEach((array) => {
    tmp += `
      <div class="container-progress">
        <p>${array[0].toUpperCase()}</p>
        <div class="progress">
          <div class="bar" style="width:${array[1] * 10}%">
            <p class="percent">${array[1] * 10}%</p>
          </div>
        </div>
    </div>
    `;
  });
  return tmp;
};
/* Show modal when click card */
containerHero.addEventListener('click', (event) => {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  const idHero = event.target.id;
  if (idHero !== 'container-hero') {
    const heroData = dataLol.filter(dataHero => dataHero.key === idHero);
    modal.classList.replace('hide', 'flex-style');
    modalContent.innerHTML = `
      <div class="" style="background: url(${heroData[0].splash})">
        <div class="modal-inside">
        <div class="modal-top">
          <img src=${heroData[0].img}/>
          <div class="modal-title">
            <div class="separator"><h1>${heroData[0].id}</h1></div>
            <h3>${heroData[0].title}</p>
          </div>
        </div>
        <div class="modal-info">
          <div class="modal-bottom">
            <p>${heroData[0].blurb}</p>
            <div class="status-main">
              <div class="status">
              ${progreStats(heroData[0].info)}
              </div>
            </div>
          </div>
          <div class="container-stats">
            <p>STATS</p>
            
            <div class="container-table">
              <table>${fillTable(heroData[0].stats)}</table>
            </div>
          </div>
        </div>
        </div>
      </div>
    `;
  }
});

const span = document.getElementsByClassName('close')[0];

span.addEventListener('click', () => {
  modal.classList.replace('flex-style', 'hide');
  document.body.style.overflowY = 'scroll';
});

championSelect.addEventListener('change', (event) => {
  let dataFiltered = [];
  if (orderSelect.value !== '') {
    dataFiltered = sortAlphabet(filterChampions(dataLol, event.target.value), orderSelect.value);
  } else {
    dataFiltered = filterChampions(dataLol, event.target.value);
  }
  containerHero.innerHTML = createCards(dataFiltered);
  totalContainer.innerHTML = `${event.target.value}: ${dataFiltered.length}`;
});

orderSelect.addEventListener('change', (event) => {
  let dataSortered = [];
  if (championSelect.value !== '') {
    dataSortered = filterChampions(sortAlphabet(dataLol, event.target.value), championSelect.value);
  } else {
    dataSortered = sortAlphabet(dataLol, event.target.value);
  }
  containerHero.innerHTML = createCards(dataSortered);
  totalContainer.innerHTML = `Total: ${dataSortered.length}`;
});


searchInput.addEventListener('click', () => {
  championSelect.value = '';
  orderSelect.value = '';
  containerHero.innerHTML = createCards(dataLol);
});
searchInput.addEventListener('input', (event) => {
  const resultHeroes = searchHero(dataLol, event.target.value);
  containerHero.innerHTML = createCards(resultHeroes);
  totalContainer.innerHTML = `Total: ${resultHeroes.length}`;
});

// Button back top
const up = document.querySelector('#up');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    up.classList.remove('hide');
  } else {
    up.classList.add('hide');
  }
});

up.addEventListener('click', () => {
  window.scrollTo(0, 0);
});


/* Navigation slidebar */
const menu = document.querySelector('#menu');
const drawer = document.querySelector('nav');
const oscurecer = document.querySelector('.oscurecer');

menu.addEventListener('click', (e) => {
  drawer.classList.toggle('open');
  /* Darken page */
  oscurecer.style.display = 'block';
  /*  Avoid scroll in main page */
  document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  e.stopPropagation();
});

drawer.addEventListener('click', (event) => {
  if (event.target.id !== 'navigation') {
    drawer.classList.remove('open');
    /* Aclarar contenido al cerrar el menu */
    oscurecer.style.display = 'none';
    /* Activate scroll  */
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }
});

oscurecer.addEventListener('click', () => {
  /* Close menu */
  drawer.classList.remove('open');
  /* Aclarar contenido al cerrar el menu */
  oscurecer.style.display = 'none';
  /* Activate scroll  */
  document.getElementsByTagName('html')[0].style.overflow = 'auto';
});

/* CHARTS */
google.charts.load('current', { packages: ['table'] });

const drawTable = (index) => {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Name');
  dataTable.addColumn('string', 'Imagen');
  dataTable.addColumn('number', index);

  let tabla = [];
  tabla = dataChart(dataLol, index);
  dataTable.addRows(tabla);
  const options = {
    allowHtml: true,
    showRowNumber: true,
    width: '95%',
    height: 410,
    sortColumn: 2,
    sortAscending: false,
  };
  const table = new google.visualization.Table(document.getElementById('chart'));
  table.draw(dataTable, options);
};

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (event) => {
  if (event.target.id !== 'buttons') {
    // drawTable(event.target.id);
    google.charts.setOnLoadCallback(drawTable(event.target.id));
  }
});
