const express = require("express");
const createPath = require("../helpers/create-pass");
const { check, body } = require("express-validator");
// const { faker } = require("@faker-js/faker");
const Post = require("../models/post");
const {
  getPost,
  getPosts,
  updatePost,
  deletePost,
  addPost,
  editingPost,
} = require("../controllers/post-controller");
const router = express.Router();
const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"), { title: "Error" });
};

router.get("/add-post", (req, res) => {
  const title = "Добавление статьи";
  const data = {
    errors: "",
    title: "",
    text: "",
  };
  // res.sendFile(createPath("add-post"));
  res.render(createPath("add-post"), { title, data });
});

router.put(
  "/edit/:id",
  [
    body("title")
      .isEmpty()
      .withMessage("Необходимо заполнить все поля")
      .trim()
      .escape(),
    body("author")
      .isEmpty()
      .withMessage("Необходимо заполнить все поля")
      .trim()
      .escape(),
    body("text")
      .isLength({ min: 20 })
      .withMessage("Вводите статью, а не всякую хрень!")
      .trim()
      .escape(),
  ],
  updatePost
);
router.delete("/posts/:id", deletePost);

router.post(
  "/add-post",
  [
    body("title")
      .isLength({ min: 15 })
      .withMessage("Необходимо заполнить все поля ")
      .trim()
      .escape(),
    body("author")
      .isLength({ min: 2 })
      .withMessage("Необходимо заполнить все поля")
      .trim()
      .escape(),
    body("text")
      .isLength({ min: 20 })
      .withMessage("Вводите статью, а не всякую хрень!")
      .trim()
      .escape(),
  ],
  addPost
);
router.get("/posts/:page", getPosts);
router.get("/posts", getPosts);
router.get("/posts/post/:id", getPost);

router.get("/edit/:id", editingPost);
// router.get("/generate-fake-data", function (req, res) {
//   for (let i = 0; i < 4; i++) {
//     const post = new Post();

//     post.title = faker.lorem.sentences();
//     post.author = faker.person.firstName();
//     post.text = faker.lorem.text();
//     post.image = faker.image.url();

//     post
//       .save()
//       .then((result) => res.redirect("/posts"))
//       .catch((error) => handleError(res, error));
//   }
// });

module.exports = router;
