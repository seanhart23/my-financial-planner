function variance() {
  var percent = localStorage.getItem("variance")
  document.getElementById("percent").innerHTML = percent + "%";
  document.getElementById('chart').style.height = percent + "%";
  document.getElementById('chartLine').style.height = (100 - percent) + "%";
}

function paidOff() {
  var paidOff = localStorage.getItem("paidOff")
  document.getElementById("paidOff").innerHTML = paidOff;
}

variance();
paidOff();
