// https://github.com/notiflix/Notiflix#readme
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

import { refs } from './refs';
import storage from './storage';

const LOCAL_KEY = 'todo-message';

// 2. Створюємо об'єкт, де будимо зберігати тудушку
let todo = {};

// 3. Додаємо слухачів подій (на зміну введених данних, щоб зберігти ці данні, і сабміт для відправки даних)
refs.formRef.addEventListener('input', onSaveTodo);
refs.formRef.addEventListener('submit', onSubmit);

function onSaveTodo(e) {
  const { name, value } = e.target;
  // 4. Записуємо властивості в об'єкт туду і зберігаємо дані в локалсторадж
  todo[name] = value;
  storage.save(LOCAL_KEY, { ...todo, id: uuidv4() });
}

function onSubmit(e) {
  e.preventDefault();
  // 5. При сабміті перевіряємо, чи всі поля заповнені
  const { text, priority } = todo;
  if (!text || !priority) {
    // alert('All fields must not be empty');
    Notify.failure('All fields must not be empty');
    return;
  }
  // 5.1. Додаємо дані з об'єкту туду у розмітку
  const markup = `<li>Todo: ${text}, priority: ${priority} <button type="button" class="todo__delete" id=${uuidv4()}></button></li>`;
  refs.listRef.insertAdjacentHTML('beforeend', markup);
  Notify.success('Note added successfuly');

  // 7. Додаємо можливість видалити туду
  const deleteBtns = document.querySelectorAll('.todo__delete');
  deleteBtns.forEach(btn => btn.addEventListener('click', deleteTodo));

  // 6. Очищуємо локалсторадж, форму, об'єкт
  refs.formRef.reset();
  storage.remove(LOCAL_KEY);
  Object.keys(todo).forEach(key => (todo[key] = ''));
}

// 5.2. Якщо в локалсторадж є дані, записуємо їх в форму
initTodo();

function initTodo() {
  const savedTodo = storage.load(LOCAL_KEY);
  if (savedTodo) {
    for (let key in savedTodo) {
      refs.formRef[key].value = savedTodo[key];
      todo[key] = savedTodo[key];
    }
  }
}

// 7.1. Функція видалення туду по id
function deleteTodo(e) {
  // const filteredList = [...refs.listRef.children].filter(
  //   item => e.target.id !== item.lastChild.id
  // );
  // refs.listRef.innerHTML = '';
  // refs.listRef.append(...filteredList);
  const deletedItem = [...refs.listRef.children].find(
    item => e.target.id === item.lastChild.id
  );
  deletedItem.remove();
}
