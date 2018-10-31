var queryURL = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2012765026&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys/";
var event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
$.getJSON(queryURL, function (data) {
  
  var results = data.query.results
  var firstResult = results.channel.item.condition
  console.log(firstResult);
  
  var location = 'Unknown' // not returned in response
  var temp = firstResult.temp
  var text = firstResult.text
  var date = firstResult.date

  $('#output').append(date);
  
})
