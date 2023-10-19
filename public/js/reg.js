const pass_1 = document.querySelector("#password_1");
const pass_2 = document.querySelector("#password_2");
const success = document.querySelector("#success");
const error = document.querySelector("#error");
let name = document?.querySelector("#name");
let email = document?.querySelector("#email");
var isNameCorrect = false;
var isEmailCorrect = false;
var isPasswordCorrect = false;

name?.addEventListener("blur", () => {
  const nameVal = name.value;
  const regexp = /[а-яa-z]+/i;
  if (regexp.test(nameVal)) {
    isNameCorrect = true;
    error.innerHTML = "";
  } else {
    error.innerHTML = "<span>Имя введено некорректно</span>";
  }
});

email?.addEventListener("blur", () => {
  const emailVal = email.value;
  const regexp2 = /^[а-яa-z0-9]+@[а-яa-z]+.[а-яa-z]{2,}$/i;
  if (regexp2.test(emailVal)) {
    isEmailCorrect = true;
    error.innerHTML = "";
  } else {
    error.innerHTML = "<span> Введен некорректный email</span>";
  }
});

pass_2?.addEventListener("blur", () => {
  if (pass_1.value === pass_2.value && pass_1 !== "") {
    isPasswordCorrect = true;
    error.innerHTML = "";
    if (isNameCorrect && isEmailCorrect && isPasswordCorrect) {
      console.log("ok");
      success.innerHTML = "<span>Все введено верно</span>";
      document.querySelector("#send").setAttribute("type", "submit");
    }
  } else {
    error.innerHTML = "<span>Пароль не совпадает</span>";
  }
});
