window.onload = function () {
  if(sessionStorage.getItem('display') !== null){
    var display = sessionStorage.getItem('display');
    document.getElementById("modalWin").style.display = display;
  }
}

function registrClick() {
  console.log("work");
  document.getElementById("modalWin").style.display = "block";
  sessionStorage.setItem('display', 'block');
}

function closeClick() {
  document.getElementById('modalWin').style.display = 'none';
  sessionStorage.setItem('display', 'none');
}

window.onclick = function(event) {
  var modal = document.getElementById('modalWin');
  if (event.target == modal) {
    document.getElementById('modalWin').style.display = 'none';
    sessionStorage.setItem('display', 'none');
  }
}

function testLogin(login){
  if(/^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(login) === false) {
    alert('Вы неверно ввели логин. Пример: kairat'); 
    return false;
  }
  return true;
}

function testPassword(password){
  if(/^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(password) === false) {
    alert('Вы неверно ввели пороль. Пример: aqazwsx12'); 
    return false;
  }
  return true;
}

function testEmail(email) {
  for(var i = 0; i < email.length; i++) {
    if(email[i] == '@'){
      return true;
    }
  }
  alert('Email должен содержать символ - @');
  return false;
}

function registrModalClick() {
  var loginWin = document.getElementById("loginWin").value;
  var resultLogin = testLogin(loginWin);
  var passwordWin = document.getElementById("passwordWin").value;
  var resultPassword = testPassword(passwordWin);
  var emailWin = document.getElementById("emailWin").value;
  var resultEmail = testEmail(emailWin);
  if(resultLogin == true && resultPassword == true && resultEmail == true) {
    localStorage.setItem('login', loginWin);
    localStorage.setItem('password', passwordWin);
  } 
}

function websiteEntry() {
  var login = document.getElementById("login").value;
  var password = document.getElementById("password").value;
  if(login === localStorage.getItem('login') && password === localStorage.getItem('password')) {
    innerWebsite(login);
  }else(
    alert("Неверынй логин или пороль!!!")
  )
}

function innerWebsite(login) {
  
}