// 1.4. Додаємо бібліотеку
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { createGalleryCard } from './createGalleryCard';
// 1.3. Імпортуємо клас і створюємо екземпляр
import { UnsplashAPI } from './unsplashAPI';
const service = new UnsplashAPI();

// 1.5. Отримуємо посилання на потрібні елементи
const container = document.getElementById('tui-pagination-container');
const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.js-search-form');

// 1.5.Створюємо об'єкт налаштувань з бібліотеки
const options = {
  totalItems: 0,
  itemsPerPage: 9,
  visiblePages: 5,
  page: 1,
  //3. Додаємо кастомні стилі на пагінацію через css
  // template: {
  //   page: '<a href="#" class="tui-page-btn tui-custom-btn">{{page}}</a>',
  //   currentPage:
  //     '<strong class="tui-page-btn tui-is-selected tui-custom-btn">{{page}}</strong>',
  //   moveButton:
  //     '<a href="#" class="tui-page-btn tui-{{type}}">' +
  //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //     '</a>',
  //   disabledMoveButton:
  //     '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
  //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //     '</span>',
  //   moreButton:
  //     '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
  //     '<span class="tui-ico-ellip">...</span>' +
  //     '</a>',
  // },
};

// 1.5. Додаємо пагінацію і отримуємо page, щоб додавати у запит
const paginetion = new Pagination(container, options);
const page = paginetion.getCurrentPage();

// 1.4. Робимо запит за популярними зображеннями
// service
//   .getPopularImages(page)
//   .then(({ total, results }) => {
//     paginetion.reset(total);
//     // 1.6. Створюємо функцію для відображення зображень на сторінці (в окремому файлі)
//     const markup = createGalleryCard(results);
//     galleryEl.insertAdjacentHTML('afterbegin', markup);
//     lightbox.refresh();
//   })
//   .catch(() => Notify.failure('Something wrong'));

// через axios і try/catch
async function loadData() {
  try {
    const data = await service.getPopularImages(page);
    const { total, results } = data;
    paginetion.reset(total);
    // 1.6. Створюємо функцію для відображення зображень на сторінці (в окремому файлі)
    const markup = createGalleryCard(results);
    galleryEl.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.log(err);
    Notify.failure('Something wrong');
  }
}
loadData();

// 1.7. Активуємо додавання нових сторінок при переході по пагінації
const popular = event => {
  const currentPage = event.page;
  service
    .getPopularImages(currentPage)
    .then(({ results }) => {
      galleryEl.innerHTML = '';
      const markup = createGalleryCard(results);
      galleryEl.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(() => Notify.failure('Something wrong'));
};
paginetion.on('afterMove', popular);

// 2.3. Додаємо пошук зображення при сабміті
formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  // 2.4. Витягаємо квері з інпута і записуємо слово в змінну
  const { query } = e.target.elements;
  const searchValue = query.value.trim();

  if (!searchValue) return Notify.failure('Enter some query for search!');

  // 2.5. присвоюємо у властивість query слово запиту з інпута
  service.query = searchValue;

  // 2.7. Прибираємо "слухачів" пагінації, щоб йшов тільки один запит на бек
  paginetion.off('afterMove', popular);

  paginetion.off('afterMove', getByGuery);

  // 2.6. Робимо запит за зображеннями по пошуку
  service
    .getSearchImages(page)
    .then(({ total, results }) => {
      // Перевірка, що ввели щось корректне
      if (results.length === 0)
        return Notify.failure('Unknown word for search!');

      paginetion.reset(total);
      galleryEl.innerHTML = '';
      const markup = createGalleryCard(results);
      galleryEl.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(() => Notify.failure('Something wrong'));

  // 2.7. Активуємо додавання нових сторінок при переході по пагінації по другому запиту
  paginetion.on('afterMove', getByGuery);
}

function getByGuery(event) {
  const currentPage = event.page;
  service
    .getSearchImages(currentPage)
    .then(({ results }) => {
      galleryEl.innerHTML = '';
      const markup = createGalleryCard(results);
      galleryEl.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(() => Notify.failure('Something wrong'));
}
