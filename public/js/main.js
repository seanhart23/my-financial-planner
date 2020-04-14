var $,
    queryURL = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2012765026&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys/";

$.getJSON(queryURL, function (data) {
  
  var results = data.query.results,
      firstResult = results.channel.item.condition,
      date = firstResult.date;

  $('#output').append(date);
  
});

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