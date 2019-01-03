var LOGIN_NAME = "loginName";

function result() {
  var login = document.getElementById("login").value;
  var password = document.getElementById("password").value;

  if (login == "Kairat" && password == "garnier12") {
    localStorage.setItem(LOGIN_NAME, login);
    alert("Добро пожаловать " + login);
    window.location = 'EnterNewLocation/javaHTML.html';
  } else {
    alert("Неверный логин или пароль");
  }
}

function loadData() {
  var textSpan = document.getElementById("textspan");
  var login = localStorage.getItem(LOGIN_NAME);
  textSpan.innerText = login;
}

function exitButton() {
  window.location = '../javaHTML.html';
}