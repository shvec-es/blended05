// 1. Отримуємо посилання на потрібні елементи

export const refs = {
  loginForm: document.querySelector('.login-form'),
  loginInput: document.querySelector('input[name="email"]'),
  loginPassword: document.querySelector('input[name="password"]'),
  loginBtn: document.querySelector('.login-btn'),
  todoForm: document.querySelector('.todo'),
  todoList: document.querySelector('.todo__items'),
};
