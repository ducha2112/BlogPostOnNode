function showText() {
  $("#text").html(
    '<h2>Ресурсы по разработке сайта</h2><ul><li class="resource"><a href="#">Termux для андроид</a></li><li class="resource"><a href="#">Редактор кода для андроид</a></li><li class="resource"><a href="#">NodeJS</a></li><li class="resource"><a href="#">Фреймворк Express.js</a></li></ul>'
  );
}

let body = document.querySelector("body");
$("#in").html(
  '<a><h2 onclick="showText()">Hello, Dolly!</h2><div id="text"></div></a>'
);

const arr = ["node.jpg", "express.jpg", "code.jpg", "nodejs.png", "maxres.jpg"];
function iterator(array) {
  let i = 0;
  return {
    next: function () {
      if (i == arr.length) i = 0;
      return i < array.length ? "img/" + array[i++] : "";
    },
  };
}
let back = "";
let text = iterator(arr);

setInterval(function () {
  back = text.next();
  let styles = {
    backgroundImage:
      "linear-gradient(rgba(0, 0, 255, 0.8), rgba(199, 21, 133, 0.8)),url(" +
      back +
      ")",
    backgroundSize: "cover",
    backgroundPosition: "80% 90%",
  };
  $("body").css(styles).animate(
    {
      backgroundPositionX: "30%",
      backgroundPositionY: "40%",
    },
    10000
  );
}, 10000);
