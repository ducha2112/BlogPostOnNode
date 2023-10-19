const express = require("express");
const createPath = require("../helpers/create-pass");

const { registerUser, getUser } = require("../controllers/user-controller");
const router = express.Router();
const { check, body } = require("express-validator");

router.post(
  "/reg",
  [
    body("name")
      .matches(/[a-zа-яё]/i)
      .withMessage("Введите корректное имя")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Введите корректный email")
      .normalizeEmail()
      .trim()
      .escape(),
    body("pass")
      .isLength({ min: 8 })
      .withMessage("Пароль должен содержать не менее 8 символов ")
      .matches(/\d/)
      .withMessage("Пароль должен содержать минимум 1 цифру")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        'Пароль должен содержать минимум 1 специальный символ [!@#$%^&*(),.?":{}|<>]'
      )
      .trim()
      .escape(),
  ],
  registerUser
);

router.get("/reg", (req, res) => {
  const title = "Регистрация";
  const data = {
    error: "",
    success: "",
  };
  res.render(createPath("reg"), { title, data });
});
router.get("/cabinet", (req, res) => {
  const title = "Личный кабинет";
  const user = req.session.user;
  res.render(createPath("cabinet"), { title, user });
});
router.get("/login", (req, res) => {
  const title = "Вход в личный кабинет";
  const data = {
    error: "",
    success: "",
  };
  res.render(createPath("login"), { title, data });
});

router.get("/log-out", (req, res) => {
  const userName = req.session.user?.name;
  req.session.destroy((err) => {
    if (err) console.log(err);
    else {
      const title = "Вход в личный кабинет";

      const data = {
        error: "",
        success: userName + ", вы успешно вышли из аккаунта",
      };

      res.render(createPath("login"), { title, data });
    }
  });
});

router.post(
  "/cabinet",
  [
    body("email").normalizeEmail().trim().escape(),
    body("password").trim().escape(),
  ],
  getUser
);
module.exports = router;
