var $;

var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();
    
// MENU LOGIC
$(function () {
    $("#expense").on("click", function () {
        $("#main-page-section").load("/expense");
    });    
    $("#bill-edit").on("click", function () {
        $("#main-page-section").load("/expense");
    });
    $("#debt-tracker").on("click", function () {
        $("#main-page-section").load("/debt");
    });
    $("#debt-snowball").on("click", function () {
        $("#main-page-section").load("/snowball");
    });
    $("#budget").on("click", function () {
        $("#main-page-section").load("/budget");
    });
});











// CREATE BAR CHART

// (function chart() {
//   var percentage = document.getElementById('percentage').innerHTML;
      
//   document.getElementById('chart').style.height     = percentage + "%";
//   document.getElementById('percent').innerHTML      = percentage + " %";
//   document.getElementById('chartLine').style.height = (100 - percentage) + "%";
// })();

// //



