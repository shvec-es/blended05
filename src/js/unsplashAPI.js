import axios from 'axios';
// 1. Створюємо клас для запитів на бек
export class UnsplashAPI {
  // 1.1. Оголошуємо приватні властивості для складання адреси запиту
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  // 2.1. Додаємо приватну властивість для зберігання запиту на бек для пошуку картинок
  #query = '';
  // скорочуємо запит на бек завдяки URLSearchParams
  #searghParams = new URLSearchParams({
    per_page: 9,
    client_id: this.#API_KEY,
    orientation: 'portrait',
  });

  // 1.2. Створюємо метод для відображення "популярних" зображень при завантаженні сторінки
  async getPopularImages(page) {
    // const url = `${
    //   this.#BASE_URL
    // }?page=${page}&query=popular&per_page=9&orientation=portrait&client_id=${
    //   this.#API_KEY
    // }`;
    // скорочуємо запит на бек завдяки URLSearchParams
    const url = `${this.#BASE_URL}?page=${page}&query=popular&${
      this.#searghParams
    }`;

    return await fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.status);
        return resp.json();
      })
      .catch(err => console.log(err));

    // через axios і try/catch
    // try {
    //   const resp = await axios.get(url);
    //   return resp.data;
    // } catch (error) {
    //   console.log(error.message);
    // }
  }

  // 2. Створюємо метод для відображення зображень по пошуку
  async getSearchImages(page) {
    // const url = `${this.#BASE_URL}?page=${page}&query=${
    //   this.#query
    // }&per_page=9&orientation=portrait&client_id=${this.#API_KEY}`;

    // скорочуємо запит на бек завдяки URLSearchParams
    const url = `${this.#BASE_URL}?page=${page}&query=${this.#query}&${
      this.#searghParams
    }`;

    return await fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.status);
        return resp.json();
      })
      .catch(err => console.log(err));
  }
  // 2.2. Створюємо сеттер, щоб змінювати значення квері
  set query(newQuery) {
    this.#query = newQuery;
  }
}
