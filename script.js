$( document ).ready(function() {
    console.log( "ready!" );
})
var cities = ['san diego', 'los angeles', 'new york'];
function currentWeather() {
  navigator.geolocation.getCurrentPosition(function (position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
  
let apiKey = '4fbbb274cc7965f5029fef1b41f5f697';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" +  apiKey;
var cityName = $("#searchBox").val();

$.ajax({
  url: queryURL,
  method: "GET"
})
  
  .then(function(response) {
    var iconPic = response.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconPic + ".png";
  console.log(response);
  // inputs city text
  $(".city").html("<h1> " + response.name + " </h1>");
    // inputs temperature text
  $(".temp").text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + " °F");
    // inputs humidity text
    $(".humidity").text("Humidity: " + response.main.humidity + " %");
    // inputs wind speed text
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    // inputs icon pic
    $("#wicon").attr("src", iconUrl);

  });
});
};

currentWeather();


