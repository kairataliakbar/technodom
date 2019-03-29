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
  }if(localStorage.getItem("adminEntry") === 'admin') {
    document.getElementById("myBasketButton").style.display = "none";
  }if(localStorage.getItem("adminEntry") !== 'admin') {
    document.getElementById("addAnnouncementButton").style.display = "none";
  }if(localStorage.getItem("redactAnnouncement") === "true") {
    onloadValueAnnouncement();
  }if(localStorage.getItem("addNewAnnouncementSnackbar") === "true") {
    localStorage.removeItem("addNewAnnouncementSnackbar");
    snackbarAddProductInBasket();
  }if(document.getElementById("containerPhonsMain") !== null) {
    var phone = "phon";
    onloadPhonePage(phone);
  }if(document.getElementById("containerPCMain") !== null) {
    var pc = "pc";
    onloadPCPage(pc);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(sessionStorage.getItem('display') !== null && document.getElementById("modalWin") !== null) {
    var display = sessionStorage.getItem('display');
    document.getElementById("modalWin").style.display = display;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("adminEntry") === 'admin' && document.getElementById("buttonAdminProduct") !== null) {
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

  if(document.getElementById("modalWinBasket") === event.target) {
    document.getElementById("modalWinBasket").style.display = "none";
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
  if(document.getElementById("containerBottomMain") !== null) {
    var announcement = JSON.parse(localStorage.getItem("array"));
    for(i = 0; i < announcement.length; i++){
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
      button.innerHTML = "Купить в кредит";

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
}

function newAnnouncement() {
  if(localStorage.getItem("redactAnnouncement") !== "true") {
    var headline = document.getElementById("titleText").value;
    var codProduct = document.getElementById("codProduct").value;
    var heading = document.getElementById("headingTitleContainer").value;
    var pricesProduct = document.getElementById("pricesText").value;
    var textArea = document.getElementById("textArea").value;
    var imgSrc = document.getElementById("result").src;
    var modelProduct = document.getElementById("modelTitleContainer").value;
    var colorProduct = document.getElementById("colorTitleContainer").value;
    var dataProduct = document.getElementById("dataTitleContainer").value;
    
    var announcement = {
      announcementHeadline: headline,
      announcementCodProduct: codProduct,
      announcementHeading: heading,
      announcementPricesProduct: pricesProduct,
      announcementTextArea: textArea,
      announcementImgSrc: imgSrc,
      announcementModel: modelProduct,
      announcementColor: colorProduct,
      announcementData: dataProduct
    };
  
    array = JSON.parse(localStorage.getItem("array"));
    if(array === null) {
      var array = [];
      array.unshift(announcement);
    }else { array.unshift(announcement); }
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("addNewAnnouncementSnackbar", "true");
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
  if(document.getElementById("productImageId") !== null) {
    var codProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    if(codProduct !== null) {
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
  }
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
  if(document.getElementById("titleText") !== null) {
    var product = JSON.parse(localStorage.getItem("arrayProduct"));
    document.getElementById("titleText").value = product.announcementHeadline;
    document.getElementById("codProduct").value = product.announcementCodProduct;
    document.getElementById("headingTitleContainer").value = product.announcementHeading;
    document.getElementById("pricesText").value = product.announcementPricesProduct;
    document.getElementById("textArea").value = product.announcementTextArea;
    document.getElementById("result").src = product.announcementImgSrc;
    document.getElementById("modelTitleContainer").value = product.announcementModel;
    document.getElementById("colorTitleContainer").value = product.announcementColor;
    document.getElementById("dataTitleContainer").value = product.announcementData;
  }
}

function addBasket(codProduct) {
  arrayBasket = [];
  for(var i = 0; i < array.length; i++) {
    if(codProduct === array[i].announcementCodProduct) {
      if(localStorage.getItem("arrayBasket") === null || localStorage.getItem("arrayBasket") === undefined) {
        arrayBasket.unshift(array[i]);
        localStorage.setItem("arrayBasket", JSON.stringify(arrayBasket));
        snackbarAddProductInBasket();
      }else {
        arrayBasket = JSON.parse(localStorage.getItem("arrayBasket"));
        arrayBasket.unshift(array[i]);
        localStorage.setItem("arrayBasket", JSON.stringify(arrayBasket));
        snackbarAddProductInBasket();
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
  if(document.getElementById("basketContainer") !== null) {
    basketArrayProducts = JSON.parse(localStorage.getItem("arrayBasket"));
    if(localStorage.getItem("arrayBasket") !== null) {
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
        divBasketContainerText.id = basketArrayProducts[i].announcementCodProduct;
        divBasketContainerText.onclick = function() {
          onclickBasketProduct(this.id);
        };
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
        var button = document.createElement("span");
        button.className = "button-delete-basket";
        button.innerHTML = "&times;";
        button.count = basketArrayProducts[i].announcementCodProduct;
        button.onclick = function() {
          localStorage.setItem("deleteProductInBasket", this.count);
          openModalBasketContainer();
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
    var totalPrices = 0;
    if(localStorage.getItem("arrayBasket") !== null) {
      for(var i = 0; i < basketArrayProducts.length; i++) {
        var price = basketArrayProducts[i].announcementPricesProduct;
        price = price.replace(/\s/g, '');
        totalPrices += parseInt(price);
      }  
    }
    document.getElementById("totalPrices").innerHTML = totalPrices + "₸";
    if(totalPrices === 0) {
      document.getElementById("totalPricesButton").innerText = "К ПОКУПКАМ";
      document.getElementById("totalPricesButton").onclick = function() {
        location = "../Home page visitor.html";
      };
    }else {
      document.getElementById("totalPricesButton").innerText = "ОФОРМИТЬ ЗАКАЗ";
    }
  }
});

function onclickBasketProduct(codProduct) {
  for(var i = 0; i < array.length; i++) {
    if(codProduct === array[i].announcementCodProduct){
      if(localStorage.getItem("arrayProduct") === null && localStorage.getItem("arrayProduct") === undefined) {
        localStorage.setItem("arrayProduct", JSON.stringify(array[i]));
        localStorage.setItem("pageProductEntry", true);
        location = "../pageProduct/pageProduct.html";
      }else {
        localStorage.removeItem("arrayProduct");
        localStorage.setItem("arrayProduct", JSON.stringify(array[i]));
        localStorage.setItem("pageProductEntry", true);
        location = "../pageProduct/pageProduct.html";
      }
    }
  }
}

function removeBasketProduct() {
  var codProduct = localStorage.getItem("deleteProductInBasket");
  var arrayBasket = JSON.parse(localStorage.getItem("arrayBasket"));
  for(var i = 0; i < arrayBasket.length; i++) {
    if(codProduct === arrayBasket[i].announcementCodProduct) {
      arrayBasket.splice(i, 1);
    }
  }
  localStorage.setItem("arrayBasket", JSON.stringify(arrayBasket));
  closeModalBasketContainer()
  location.reload();
}

function openModalBasketContainer() {
  document.getElementById("modalWinBasket").style.display = "block";
}

function closeModalBasketContainer() {
  document.getElementById("modalWinBasket").style.display = "none";
}

function snackbarAddProductInBasket() {
  var x = document.getElementById("snackbarAddProductBasketContainer");
  x.className = "show";
  setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

function onloadPhonePage(productName) {
  var arrayProduct = JSON.parse(localStorage.getItem("array"));

  var minPricesFilter = localStorage.getItem("minPricesFilter");
  var maxPricesFilter = localStorage.getItem("maxPricesFilter");
  var modelFilter = localStorage.getItem("modelFilter");
  var colorFilter = localStorage.getItem("colorFilter");
  var dataFilter = localStorage.getItem("dataFilter");
  
  for(var i = 0; i < arrayProduct.length; i++) {
    if(productName === arrayProduct[i].announcementHeading) {
      var prices = arrayProduct[i].announcementPricesProduct;
      prices = prices.replace(/\s/g, '');
      if(parseInt(minPricesFilter) <= parseInt(prices) || minPricesFilter == null) {
        if(parseInt(maxPricesFilter) >= parseInt(prices) || maxPricesFilter == null) {
          if(colorFilter == arrayProduct[i].announcementColor || colorFilter == "Цвет" || colorFilter == null) {
            if(dataFilter == arrayProduct[i].announcementData || dataFilter == "Год" || dataFilter == null) {
              if(modelFilter == arrayProduct[i].announcementModel ^ modelFilter == "Mодель" || modelFilter == null) {
                var headline = arrayProduct[i].announcementHeadline;
                var codProduct = arrayProduct[i].announcementCodProduct;
                var heading = arrayProduct[i].announcementHeading;
                var pricesProduct = arrayProduct[i].announcementPricesProduct + "₸";
                var textArea = arrayProduct[i].announcementTextArea;
                var imgSrc = arrayProduct[i].announcementImgSrc; 
                  
                var divForvordContainer = document.createElement("div");
                divForvordContainer.className = "forvord-container";
                var divForvordContainerImg = document.createElement("div");
                divForvordContainerImg.className = "forvord-container-img";
                divForvordContainerImg.count = codProduct;
                divForvordContainerImg.onclick = function () {
                  productPageProducts(this.count);
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
                button.innerHTML = "Купить в кредит";

                containerPhonsMain.appendChild(divForvordContainer);
                divForvordContainer.appendChild(divForvordContainerImg);
                divForvordContainerImg.appendChild(imgForvordContainer);
                divForvordContainerImg.appendChild(divForvordContainerText);
                divForvordContainer.appendChild(divForvordContainerButton);
                divForvordContainerButton.appendChild(divPrices);
                divForvordContainerButton.appendChild(buttonInGarbage);
                divForvordContainerButton.appendChild(button);
                
              }
            }
          }
        }
      }
    }
  }
  localStorage.removeItem("minPricesFilter");
  localStorage.removeItem("maxPricesFilter");
  localStorage.removeItem("modelFilter");
  localStorage.removeItem("colorFilter");
  localStorage.removeItem("dataFilter");
}

function onloadPCPage(productName) {
  var arrayProduct = JSON.parse(localStorage.getItem("array"));

  var minPricesFilter = localStorage.getItem("minPricesFilter");
  var maxPricesFilter = localStorage.getItem("maxPricesFilter");
  var modelFilter = localStorage.getItem("modelFilter");
  var colorFilter = localStorage.getItem("colorFilter");
  var dataFilter = localStorage.getItem("dataFilter");

  for(var i = 0; i < arrayProduct.length; i++) {
    if(productName === arrayProduct[i].announcementHeading) {
      var prices = arrayProduct[i].announcementPricesProduct;
      prices = prices.replace(/\s/g, '');
      if(parseInt(minPricesFilter) <= parseInt(prices) || minPricesFilter == null) {
        if(parseInt(maxPricesFilter) >= parseInt(prices) || maxPricesFilter == null) {
          if(colorFilter == arrayProduct[i].announcementColor || colorFilter == "Цвет" || colorFilter == null) {
            if(dataFilter == arrayProduct[i].announcementData || dataFilter == "Год" || dataFilter == null) {
              if(modelFilter == arrayProduct[i].announcementModel ^ modelFilter == "Mодель" || modelFilter == null) {
                var headline = arrayProduct[i].announcementHeadline;
                var codProduct = arrayProduct[i].announcementCodProduct;
                var heading = arrayProduct[i].announcementHeading;
                var pricesProduct = arrayProduct[i].announcementPricesProduct + "₸";
                var textArea = arrayProduct[i].announcementTextArea;
                var imgSrc = arrayProduct[i].announcementImgSrc; 
                  
                var divForvordContainer = document.createElement("div");
                divForvordContainer.className = "forvord-container";
                var divForvordContainerImg = document.createElement("div");
                divForvordContainerImg.className = "forvord-container-img";
                divForvordContainerImg.count = codProduct;
                divForvordContainerImg.onclick = function () {
                  productPageProducts(this.count);
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
                button.innerHTML = "Купить в кредит";

                containerPCMain.appendChild(divForvordContainer);
                divForvordContainer.appendChild(divForvordContainerImg);
                divForvordContainerImg.appendChild(imgForvordContainer);
                divForvordContainerImg.appendChild(divForvordContainerText);
                divForvordContainer.appendChild(divForvordContainerButton);
                divForvordContainerButton.appendChild(divPrices);
                divForvordContainerButton.appendChild(buttonInGarbage);
                divForvordContainerButton.appendChild(button);

              }
            }
          }
        }
      }
    }
  }
  localStorage.removeItem("minPricesFilter");
  localStorage.removeItem("maxPricesFilter");
  localStorage.removeItem("modelFilter");
  localStorage.removeItem("colorFilter");
  localStorage.removeItem("dataFilter");
}

function productPageProducts(codProduct) {
  for(var i = 0; i < array.length; i++) {
    if(codProduct === array[i].announcementCodProduct){
      if(localStorage.getItem("arrayProduct") === null && localStorage.getItem("arrayProduct") === undefined) {
        localStorage.setItem("arrayProduct", JSON.stringify(array[i]));
        localStorage.setItem("pageProductEntry", true);
        location = "../pageProduct/pageProduct.html";
      }else {
        localStorage.removeItem("arrayProduct");
        localStorage.setItem("arrayProduct", JSON.stringify(array[i]));
        localStorage.setItem("pageProductEntry", true);
        location = "../pageProduct/pageProduct.html";
      }
    }
  }
}

function onFilter() {
  var minPricesFilter = document.getElementById("priceMinFilter").value;
  var maxPricesFilter = document.getElementById("priceMaxFilter").value;
  var modelFilter = document.getElementById("manufacturerFilter").value;
  var colorFilter = document.getElementById("colorFilter").value;
  var dataFilter = document.getElementById("dataFilter").value;

  localStorage.setItem("minPricesFilter", minPricesFilter);
  localStorage.setItem("maxPricesFilter", maxPricesFilter);
  localStorage.setItem("modelFilter", modelFilter);
  localStorage.setItem("colorFilter", colorFilter);
  localStorage.setItem("dataFilter", dataFilter);
}