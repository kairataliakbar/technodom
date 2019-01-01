function Result(){
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    if(login == "Kairat" && password == "garnier12"){
        document.write("Добро пожаловать " + login);
    }else{
        alert("Неверный логин или пароль")
        
    }
}