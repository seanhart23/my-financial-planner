// CREATE BAR CHART

(function chart() {
  var percentage = document.getElementById('percentage').innerHTML;
      
  document.getElementById('chart').style.height     = percentage + "%";
  document.getElementById('percent').innerHTML      = percentage + " %";
  document.getElementById('chartLine').style.height = (100 - percentage) + "%";
})();

//



