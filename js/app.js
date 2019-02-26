var array = new Array();

window.onload = function () {
  if(localStorage.getItem('loginEntry') !== null) {
    document.getElementById("formEntry").style.display = "none";
    document.getElementById("formExit").style.display = "block";
    var spanText = document.getElementById("textSpan");
    spanText.innerText = localStorage.getItem('loginEntry');
  }if(localStorage.getItem('loginEntry') === null) {
    document.getElementById("formEntry").style.display = "block";
    document.getElementById("formExit").style.display = "none";
  }if(sessionStorage.getItem('display') !== null) {
    var display = sessionStorage.getItem('display');
    document.getElementById("modalWin").style.display = display;
  }if(localStorage.getItem("adminEntry") === 'admin') {
    document.getElementById("profilMenuContainer2").style.display = 'none';
  }if(localStorage.getItem("adminEntry") !== 'admin') {
    document.getElementById("profilMenuContainer3").style.display = 'none';
  }if(JSON.parse(localStorage.getItem("array")) !== null) {
    var announcementArray = JSON.parse(localStorage.getItem("array"));
    for(var i = 0; i < announcementArray.length; i++) {
      array.push(announcementArray[i]);
    }
    addAnnouncement();
  }
}

function registrClick() {
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
  var profilMenu = document.getElementById('profilMenu');
  if(event.target == profilMenu) {
    document.getElementById('profilMenu').style.display = 'none';
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
    closeClick();
    localStorage.setItem('loginEntry', loginWin);
  } 
}

function websiteEntry() {
  var login = document.getElementById("login").value;
  var password = document.getElementById("password").value;
  if(login === localStorage.getItem('login') && password === localStorage.getItem('password') || login === 'admin' && password === 'qwe123') {
    localStorage.setItem('loginEntry', login);
    if(login === 'admin') {
      localStorage.setItem('adminEntry', 'admin');
      document.getElementById("profilMenuContainer2").style.display = 'none';
    }else { 
      document.getElementById("profilMenuContainer3").style.display = 'none';
    }
  }else(
    alert("Неверный логин или пороль!!!")
  )
}

function exitClick() {
  localStorage.removeItem('loginEntry');
  localStorage.removeItem('adminEntry');
  document.getElementById("formEntry").style.display = "block";
  document.getElementById("formExit").style.display = "none";
  document.getElementById('profilMenu').style.display = 'none';
}

function profilMenuContainer() {
  document.getElementById("profilMenu").style.display = "block";
}

function addImage() {
  reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("result").src = e.target.result;
  }
  document.getElementById("addImg").addEventListener('change', loadFileImg);

  function loadFileImg() {
    var file = document.querySelector("#addImg").files[0];
    reader.readAsDataURL(file);
  }
}

function addAnnouncement() {
  var announcement = JSON.parse(localStorage.getItem("array"));
  for(i = 0; i < announcement.length; i++){
    indexArray = i;
    var headline = announcement[i].announcementHeadline;
    var codProduct = announcement[i].announcementCodProduct;
    var heading = announcement[i].announcementHeading;
    var pricesProduct = announcement[i].announcementPricesProduct;
    var textArea = announcement[i].announcementTextArea;
    var imgSrc = announcement[i].announcementImgSrc; 
    
    var divForvordContainer = document.createElement("div");
    divForvordContainer.className = "forvord-container";
    var divForvordContainerImg = document.createElement("div");
    divForvordContainerImg.className = "forvord-container-img";
    var imgForvordContainer = document.createElement("img");
    imgForvordContainer.src = imgSrc;
    var divForvordContainerText = document.createElement("div");
    divForvordContainerText.className = "forvord-container-text";
    divForvordContainerText.innerHTML = headline;
    var divForvordContainerButton = document.createElement("div");
    divForvordContainerButton.className = "forvord-container-button";
    var divPrices = document.createElement("div");
    divPrices.className = "summa";
    divPrices.innerHTML = pricesProduct;
    var buttonInGarbage = document.createElement("button");
    buttonInGarbage.innerHTML = "В корзину";
    var button = document.createElement("button");
    button.innerHTML = "Добавить в мои желания";

    containerBottomMain.appendChild(divForvordContainer);
    divForvordContainer.appendChild(divForvordContainerImg);
    divForvordContainerImg.appendChild(imgForvordContainer);
    divForvordContainerImg.appendChild(divForvordContainerText);
    divForvordContainer.appendChild(divForvordContainerButton);
    divForvordContainerButton.appendChild(divPrices);
    divForvordContainerButton.appendChild(buttonInGarbage);
    divForvordContainerButton.appendChild(button);
  }
}

function newAnnouncement() {
  var headline = document.getElementById("titleText").value;
  var codProduct = document.getElementById("codProduct").value;
  var heading = document.getElementById("headingTitleContainer").value;
  var pricesProduct = document.getElementById("pricesText").value;
  var textArea = document.getElementById("textArea").value;
  var imgSrc = document.getElementById("result").src;
  
  var announcement = {
    announcementHeadline: headline,
    announcementCodProduct: codProduct,
    announcementHeading: heading,
    announcementPricesProduct: pricesProduct,
    announcementTextArea: textArea,
    announcementImgSrc: imgSrc
  };

  array.push(announcement);
  localStorage.setItem("array", JSON.stringify(array));
  location = "../Home page visitor.html";
}
