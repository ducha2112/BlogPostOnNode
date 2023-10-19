const Post = require("../models/post");
const createPath = require("../helpers/create-pass");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"), { title: "Error" });
};

const getPost = (req, res) => {
  const title = "Статья автора";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { post, title }))
    .catch((error) => handleError(res, error));
};
const getPosts = (req, res) => {
  const title = "Статьи";
  Post.find()
    .sort({ createdAt: -1 }) // сортировка по дате по убыванию
    .then((posts) => {
      console.log(posts);
      for (const post of posts) {
        const arrText = post.text.split(".").slice(0, 3);
        post.text = arrText.join(".") + "...";
      }
      console.log(posts);
      res.render(createPath("posts"), { posts, title });
      // console.log(posts);
    })
    .catch((error) => handleError(res, error));
};
const updatePost = (req, res) => {
  let { title, author, text, link } = req.body;
  const image = req.files[0]?.originalname;
  if (image) {
    let partsLink = __dirname.split("\\");
    partsLink.pop();
    const link_1 = partsLink.join("\\");
    fs.unlink(link_1 + link, (err) => {
      if (err) console.log(err);
    });
  }
  const id = req.params.id;
  Post.findByIdAndUpdate(id, { title, author, text, image })
    .then((post) => res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
};
const deletePost = (req, res) => {
  fs.unlink(req.body.link, (err) => {
    if (err) console.log(err);
  });
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => handleError(res, error));
};
const addPost = (req, res) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();

  if (hasErrors) {
    const title = "Добавление статьи";

    let data = {
      errors: errors.array(),
      title: req.body.title,
      text: req.body.text,
    };
    res.render(createPath("add-post"), { title, data });
  } else {
    const { title, author, text } = req.body;
    const image = req.files[0]?.originalname;
    const post = new Post({ title, author, text, image });
    post
      .save()
      .then((result) => res.redirect("/posts"))
      .catch((error) => handleError(res, error));
  }
};
const editingPost = (req, res) => {
  const title = "Редактирование статьи";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { post, title }))
    .catch((error) => handleError(res, error));
};

module.exports = {
  getPost,
  getPosts,
  updatePost,
  deletePost,
  addPost,
  editingPost,
};
