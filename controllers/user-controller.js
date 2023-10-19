const User = require("../models/user");
const createPath = require("../helpers/create-pass");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"), { title: "Error" });
};

const registerUser = (req, res) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();

  const { name, email, pass } = req.body;
  const title = "Регистрация";
  let data = {};
  if (hasErrors) {
    data = {
      errors: errors.array(),
    };

    res.status(422).render(createPath("reg"), { title, data });
  } else {
    User.findOne({ email: email }).then(async (user) => {
      if (user) {
        data = {
          error: " Пользователь с таким email уже существует",
        };

        res.render(createPath("reg"), { title, data });
      } else {
        const salt = 10;
        const password = await bcrypt.hash(pass, salt);
        const post = new User({ name, email, password });

        post
          .save()
          .then((result) => {
            const title = "Вход в личный кабинет";
            const data = {
              error: "",
              success: "Вы успешно зарегистрированы! Авторизуйтесь!!",
              result: result,
            };
            res.render(createPath("login"), { title, data });
          })
          .catch((error) => handleError(res, error));
      }
    });
  }
};
const getUser = (req, res) => {
  const { email, pass } = req.body;
  const title = "Личный кабинет";
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(pass, user.password, (err, result) => {
          if (result) {
            req.session.user = user;
            req.session.authorized = true;

            res.render(createPath("cabinet"), { user, title });
          } else {
            const title = "Вход в личный кабинет";
            const data = {
              error: "Пароль неверный",
              success: "",
              email: email,
            };
            res.render(createPath("login"), { user, data, title });
          }
        });
      } else {
        const title = "Вход в личный кабинет";
        const data = {
          success: "",
          error: "Такого пользователя не существует",
        };
        res.render(createPath("login"), { user, title, data });
      }
    })
    .catch((error) => handleError(res, error));
};

module.exports = {
  registerUser,
  getUser,
};
