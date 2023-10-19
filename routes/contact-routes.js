const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();
const createPath = require("../helpers/create-pass");

router.get("/contacts", (req, res) => {
  const title = "Контакты";
  const data = {
    email: "email: ducha2112@yandex.ru",
    tel: "tel.: +7 (985) 922-89-70",
    telega: "telegram: @ducha2112",
  };
  Contact.find()
    .then((contacts) =>
      res.render(createPath("contacts"), { contacts, title, data })
    )
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });

  // const contacts = [
  //   { name: "YouTube", link: "https://youtube.com/" },
  //   { name: "GitHub", link: "https://github.com/" },
  //   { name: "Twitter", link: "https://twitter.com/" },
  // ];
  // res.sendFile(createPath("contacts"));
  // res.render(createPath("contacts"), { contacts, title });
});
router.get("/about-us", (req, res) => {
  res.redirect("/contacts");
}); //  срабатыветпри обращении по данному роуту

module.exports = router;
