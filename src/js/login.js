// TODO:=========================================
// ЗАДАЧА 1

// Якщо імейл і пароль користувача збігаються, зберігай дані з форми при сабміті
// у локальне сховище і змінюй кнопку Login на Logout і роби поля введення
// недоступними для змін.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити Logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці Logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку "Wrong email or password!".

// const USER_DATA = {
//   email: "user@mail.com",
//   password: "secret",
// };

import { refs } from './refs';
import storage from './storage';

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const STORAGE_KEY = 'login-data';
let savedData = {};

refs.loginForm.addEventListener('input', onSaveData);
refs.loginForm.addEventListener('submit', onCheckData);

if (storage.load(STORAGE_KEY)) {
  onPopulateData();
}

function onSaveData(e) {
  const { name, value } = e.target;
  savedData[name] = value;
}

function onCheckData(e) {
  e.preventDefault();
  const { email, password } = savedData;

  if (refs.loginBtn.textContent === 'Logout') {
    refs.loginBtn.textContent = 'Login';
    refs.loginInput.removeAttribute('readonly');
    refs.loginPassword.removeAttribute('readonly');
    storage.remove(STORAGE_KEY);
    savedData = {};
    refs.todoForm.style.display = 'none';
    return;
  }

  if (!email || !password) return alert('Fill all fields!!!');
  if (email !== USER_DATA.email || password !== USER_DATA.password)
    return alert('Uncorrect data!');

  storage.save(STORAGE_KEY, JSON.stringify(savedData));
  onPopulateData();
}

function onPopulateData() {
  refs.loginForm.reset();
  refs.loginBtn.textContent = 'Logout';
  refs.loginInput.setAttribute('readonly', true);
  refs.loginPassword.setAttribute('readonly', true);
  refs.todoForm.style.display = 'flex';
}
