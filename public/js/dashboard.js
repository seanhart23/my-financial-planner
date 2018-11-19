function variance() {
  var percent = localStorage.getItem("variance")
  document.getElementById("chart").innerHTML = percent + "%";
  document.getElementById('chart').style.height = percent + "%";
  document.getElementById('chartLine').style.height = (100 - percent) + "%";
}

variance();

