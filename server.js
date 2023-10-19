const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const { query, validationResult } = require("express-validator");
require("dotenv").config();
const createPath = require("./helpers/create-pass");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const apiPostRoutes = require("./routes/api-post-routes");
const contactRoutes = require("./routes/contact-routes");
const multer = require("multer");
const cors = require("cors");
const session = require("express-session");
const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

const storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(successMsg("Connected to DB")))
  .catch((error) => console.log(errorMsg(error)));

const app = express();

app.set("view engine", "ejs");

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Listening localhost:${process.env.PORT}`));
});
app.use(multer({ storage: storageConfig }).any());
app.use(methodOverride("_method"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  session({
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // мидлвар обрабатывающий post -тела, закодированные в url
app.use(userRoutes);
app.use(apiPostRoutes);
app.use(postRoutes);
app.use(contactRoutes);

app.get("/", (req, res) => {
  const title = "Главная страница";
  // res.send("<h1>Hello, World!</h1>");
  // res.sendFile(createPath("index"));
  res.render(createPath("index"), { title });
});

// создание мидлвара. Желательно его ставить после всех роутов
app.use((req, res) => {
  const title = "Страница ошибки";
  // создание мидлвара, кот. будет перехватывать все несущствующие url
  // res.status(404).sendFile(createPath("error"));
  res.status(404).render(createPath("error"), { title });
});
