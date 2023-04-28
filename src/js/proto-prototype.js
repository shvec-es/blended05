// 4
const iStudyJS = true;
//console.log(iStudyJS.__proto__); new Boolean()

// 5
const guestName = 'Манго';
//console.log(guestName.__proto__); new String()

// 6
const valueA = 5;
//console.log(valueA.__proto__); new Number()

//При такому зверненні в пам'яті тимчасово створюється об'єктна версія цього примітиву
//він (примітив) стає об'єктом, у якого теж є __proto__
//застосовується для рядків, чисел, булевих значень.

// 9
const book = {
  title: 'The Last Kingdom',
};

const location = {
  country: 'Jamaica',
  city: 'Ocho Rios',
};

// console.log(location.__proto__ === book.__proto__);

//Різні по "типу" об'єкти у властивості __proto__ мають зовсім різні,
//незалежні об'єкти.

//У однакових за типом об'єктів, у властивості __proto__ зберігається посилання
//на той самий об'єкт, тому вони рівні.

//Різні по "типу" об'єкти, це означає, що при створенні об'єкта
//використовувалися різні класи чи функції конструктори

//У будь-якого об'єкта є властивість __proto__
// Щоб розуміти, що це за __proto__, потрібно точно знати
//за допомогою якої функції-конструктора (класу) створено даний об'єкт

//Вбудовані функції-конструктори (вони ж класи)
//Object, Promise, Function, Boolean, Number, String, Array

// 10
function multiply() {} // new Function(...)
const fn = function () {}; // new Function(...)
const arrowAdd = () => {}; // new Function(...)
class User {} // new Function(...)

// console.log(multiply.__proto__ !== fn.__proto__);
// console.log(arrowAdd.__proto__ !== User.__proto__);
const age = 21; // new Number(...) //При такому зверненні в пам'яті тимчасово створюється об'єктна версія цього примітиву
const name = 'Ajax'; //new String (...) //При такому зверненні в пам'яті тимчасово створюється об'єктна версія цього примітиву
const areYouOkey = true; //new Boolean(...) //При такому зверненні в пам'яті тимчасово створюється об'єктна версія цього примітиву
