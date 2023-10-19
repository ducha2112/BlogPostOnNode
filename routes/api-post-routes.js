const express = require("express");
const router = express.Router();

const {
  getPost,
  getPosts,
  updatePost,
  deletePost,
  addPost,
} = require("../controllers/api-post-controller");

// Получение всех статей
router.get("/api/posts", getPosts);
// Добавление статьи
router.post("/api/post", addPost);
// получение статьи по id
router.get("/api/post/:id", getPost);
// редактирование статьи
router.put("/api/post/:id", updatePost);
// удаление статьи по id
router.delete("/api/post/:id", deletePost);

module.exports = router;
