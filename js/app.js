window.onload = function () {
  if(sessionStorage.getItem('display') !== null){
    var display = sessionStorage.getItem('display');
    document.getElementById("modalWin").style.display = display;
  }
}

function buttonClick() {
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