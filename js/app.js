array = [];

window.onload = function windowOnload() {
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
  }if(localStorage.getItem("redactAnnouncement") === "true") {
    onloadValueAnnouncement();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("adminEntry") === 'admin') {
    document.getElementById("buttonAdminProduct").style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  if(JSON.parse(localStorage.getItem("array")) !== null) {
    var announcementArray = JSON.parse(localStorage.getItem("array"));
    for(var i = 0; i < announcementArray.length; i++) {
      array.push(announcementArray[i]);
    }
    addAnnouncement();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  productPage();
});

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
    addForvordContainerNumber =+ 1;
    var headline = announcement[i].announcementHeadline;
    var codProduct = announcement[i].announcementCodProduct;
    var heading = announcement[i].announcementHeading;
    var pricesProduct = announcement[i].announcementPricesProduct + "₸";
    var textArea = announcement[i].announcementTextArea;
    var imgSrc = announcement[i].announcementImgSrc; 
      
    var divForvordContainer = document.createElement("div");
    divForvordContainer.className = "forvord-container";
    var divForvordContainerImg = document.createElement("div");
    divForvordContainerImg.className = "forvord-container-img";
    divForvordContainerImg.count = codProduct;
    divForvordContainerImg.onclick = function () {
      productPageIF(this.count);
    };
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
    buttonInGarbage.count = codProduct;
    buttonInGarbage.onclick = function () {
      addBasket(this.count);
    };
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
  if(localStorage.getItem("redactAnnouncement") !== "true") {
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

    array = JSON.parse(localStorage.getItem("array"));
    array.unshift(announcement);
    localStorage.setItem("array", JSON.stringify(array));
    location = "../Home page visitor.html";
  }else {
    localStorage.removeItem("redactAnnouncement");
    var product = JSON.parse(localStorage.getItem("arrayProduct"));
    var array = JSON.parse(localStorage.getItem("array"));
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
      if(product.announcementCodProduct !== array[i].announcementCodProduct) {
        newArray.push(array[i]);
      }
    }
    localStorage.setItem("array", JSON.stringify(newArray));
    newAnnouncement();
  }
}

function cancelNewAnnouncement() {
  location = "../Home page visitor.html";
  if(localStorage.getItem("redactAnnouncement") === "true") {
    localStorage.removeItem("redactAnnouncement");
  }
}

function productPageIF(codProduct) {
  for(var i = 0; i < array.length; i++) {
    if(codProduct === array[i].announcementCodProduct){
      if(localStorage.getItem("arrayProduct") === null && localStorage.getItem("arrayProduct") === undefined) {
        localStorage.setItem("arrayProduct", JSON.stringify(array[i]));
        localStorage.setItem("pageProductEntry", true);
        location = "./pageProduct/pageProduct.html";
      }else {
        localStorage.removeItem("arrayProduct");
        localStorage.setItem("arrayProduct", JSON.stringify(array[i]));
        localStorage.setItem("pageProductEntry", true);
        location = "./pageProduct/pageProduct.html";
      }
    }
  }
}

function productPage() {
  var codProduct = JSON.parse(localStorage.getItem("arrayProduct"));

  var imageProduct = codProduct.announcementImgSrc;
  var headlineProduct = codProduct.announcementHeadline;
  var headingProduct = codProduct.announcementHeading;
  var pricesProduct = codProduct.announcementPricesProduct + "₸";
  var codProductProduct = codProduct.announcementCodProduct;
  var textAreaProduct = codProduct.announcementTextArea;
  
  document.getElementById("productImageId").src = imageProduct;
  document.getElementById("headLineContainer").innerText = headlineProduct;
  document.getElementById("pricesProductContainer").innerText = pricesProduct;
  document.getElementById("textAreaContainer").innerText = textAreaProduct;
}

function removeAnnouncement() {
  if(localStorage.getItem("adminEntry") === 'admin') {
    var product = JSON.parse(localStorage.getItem("arrayProduct"));
    var array = JSON.parse(localStorage.getItem("array"));
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
      if(product.announcementCodProduct !== array[i].announcementCodProduct) {
        newArray.push(array[i]);
      }
    }
    localStorage.setItem("array", JSON.stringify(newArray));
    location = "../Home page visitor.html";
  }
}

function redactAnnouncement() {
  localStorage.setItem("redactAnnouncement", "true");

  location = "../addNewAnnouncement/addNewAnnouncement.html";
}

function onloadValueAnnouncement() {
  var product = JSON.parse(localStorage.getItem("arrayProduct"));
  document.getElementById("titleText").value = product.announcementHeadline;
  document.getElementById("codProduct").value = product.announcementCodProduct;
  document.getElementById("headingTitleContainer").value = product.announcementHeading;
  document.getElementById("pricesText").value = product.announcementPricesProduct;
  document.getElementById("textArea").value = product.announcementTextArea;
  document.getElementById("result").src = product.announcementImgSrc;
}

function addBasket(codProduct) {
  arrayBasket = [];
  for(var i = 0; i < array.length; i++) {
    if(codProduct === array[i].announcementCodProduct) {
      if(localStorage.getItem("arrayBasket") === null || localStorage.getItem("arrayBasket") === undefined) {
        arrayBasket.unshift(array[i]);
        localStorage.setItem("arrayBasket", JSON.stringify(arrayBasket));
        alert("Добавлено в корзину");
      }else {
        arrayBasket = JSON.parse(localStorage.getItem("arrayBasket"));
        arrayBasket.unshift(array[i]);
        localStorage.setItem("arrayBasket", JSON.stringify(arrayBasket));
        alert("Добавлено в корзину");
      }
    } 
  }
}

function addIdBasket() {
  product = JSON.parse(localStorage.getItem("arrayProduct"));
  codProduct = product.announcementCodProduct;
  addBasket(codProduct);
}

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("arrayBasket") !== null || localStorage.getItem("arrayBasket") !== undefined) {
    basketArrayProducts = JSON.parse(localStorage.getItem("arrayBasket"));
    debugger;
    for(var i = 0; i < basketArrayProducts.length; i++) {
      var imageProduct = basketArrayProducts[i].announcementImgSrc;
      var headlineProduct = basketArrayProducts[i].announcementHeadline;
      var codProductProduct = "Код товара: " + basketArrayProducts[i].announcementCodProduct;
      var pricesProduct = "Цена товара: " + basketArrayProducts[i].announcementPricesProduct + "т";

      var divBasketContainerProduct = document.createElement("div");
      divBasketContainerProduct.className = "basket-container-product";
      var imgBasket = document.createElement("img");
      imgBasket.className = "basket-img";
      imgBasket.src = imageProduct;
      var divBasketContainerText = document.createElement("div");
      divBasketContainerText.className = "basket-container-text";
      var divBasketHeadline = document.createElement("div");
      divBasketHeadline.className = "basket-headline";
      divBasketHeadline.innerHTML = headlineProduct;
      var divBasketCodProduct = document.createElement("div");
      divBasketCodProduct.className = "basket-codProduct";
      divBasketCodProduct.innerHTML = codProductProduct;
      var divBasketPrices = document.createElement("div");
      divBasketPrices.className = "basket-prices";
      divBasketPrices.innerHTML = pricesProduct;
      var divBasketButtonContainer = document.createElement("div");
      divBasketButtonContainer.className = "basket-button-container";
      var button = document.createElement("button");
      button.innerHTML = "Удалить";
      button.count = basketArrayProducts[i].announcementCodProduct;
      button.onclick = function() {
        removeBasketProduct(this.count);
      };

      basketContainer.appendChild(divBasketContainerProduct);
      divBasketContainerProduct.appendChild(imgBasket);
      divBasketContainerProduct.appendChild(divBasketContainerText);
      divBasketContainerText.appendChild(divBasketHeadline);
      divBasketContainerText.appendChild(divBasketCodProduct);
      divBasketContainerText.appendChild(divBasketPrices);
      divBasketContainerProduct.appendChild(divBasketButtonContainer);
      divBasketButtonContainer.appendChild(button);
    }
  }  
});

function removeBasketProduct(codProduct) {
  debugger;
  var arrayBasket = JSON.parse(localStorage.getItem("arrayBasket"));
  for(var i = 0; i < arrayBasket.length; i++) {
    if(codProduct === arrayBasket[i].announcementCodProduct) {
      arrayBasket.splice(i, 1);
    }
  }
  localStorage.setItem("arrayBasket", JSON.stringify(arrayBasket));
  location.reload();
}
