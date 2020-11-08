var apiKey = '4fbbb274cc7965f5029fef1b41f5f697';
var cities = [];
var cityUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey;
var searchUV = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}";
// current weather and UV function call
function currentWeather() {
  navigator.geolocation.getCurrentPosition(function (position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" +  apiKey;


$.ajax({
  url: queryURL,
  method: "GET"
})
  
  .then(function(response) {
    var iconPic = response.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconPic + ".png";
    
  console.log(response);
  
  $.ajax({
    url: cityUV + `&lat=${latitude}&lon=${longitude}`,
    method: "GET"
}).then(function (data) {
  //set a value for the current UV index.
  index = data.value;
  console.log(data);
  //clear search field
  $('.city').val(" ");
  // append index id with uv index
  $('#index').text("UV: "+ index);
  
          // if else if conditionals to set the color of the uv index box based of the value of UV index
          if (index <= 2) {
              $("#index").addClass("btn-success");
              $("#index").removeClass("btn-warning btn-hazard btn-danger btn-climate-change");
          }
          else if (index <= 5) {
              $("#index").addClass("btn-warning");
              $("#index").removeClass("btn-success btn-hazard btn-danger btn-climate-change");
          }
          
          else if (index <= 7) {
              $("#index").addClass("btn-hazard");
              $("#index").removeClass("btn-success btn-warning btn-danger btn-climate-change");
          }
          else if (index <= 10.99) {
              $("#index").addClass("btn-danger");
              $("#index").removeClass("btn-success btn-warning btn-hazard btn-climate-change");
          }
          
          else if (index >= 11) {
              $("#index").addClass("btn-climate-change");
              $("#index").removeClass("btn-success btn-warning btn-hazard btn-danger");
  //display results
  displayDashbord();
  displaySearchedList();
}
})
  // inputs city text
  $(".city").html("<h1> " + response.name + " </h1>");
    // inputs temperature text
  $(".temp").text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + " °F");
    // inputs humidity text
    $(".humidity").text("Humidity: " + response.main.humidity + " %");
    // inputs wind speed text
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    // UV Index
    
    // inputs icon pic
    $("#wicon").attr("src", iconUrl);

  });
});
};

currentWeather();
// DEFAULT fiveDayForecast data population
function fiveDayForecast(){
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=San+Diego&appid=" + apiKey;

  $.ajax({
    url: fiveDay,
    method: "GET"
  }).then(function(responseFiveDay) {
    // weather icons for 5 day forecast
    var icon1 = responseFiveDay.list[4].weather[0].icon;
    var icon1url = "http://openweathermap.org/img/w/" + icon1 + ".png";

    var icon2 = responseFiveDay.list[4].weather[0].icon;
    var icon2url = "http://openweathermap.org/img/w/" + icon2 + ".png";
    
    var icon3 = responseFiveDay.list[4].weather[0].icon;
    var icon3url = "http://openweathermap.org/img/w/" + icon3 + ".png";

    var icon4 = responseFiveDay.list[4].weather[0].icon;
    var icon4url = "http://openweathermap.org/img/w/" + icon4 + ".png";

    var icon5 = responseFiveDay.list[4].weather[0].icon;
    var icon5url = "http://openweathermap.org/img/w/" + icon5 + ".png";
    // storing 5 day temps in F
    var tempOneF = (responseFiveDay.list[4].main.temp - 273.15) * 1.8 + 32;
    var tempOne = tempOneF.toFixed(1);
    var tempTwoF = (responseFiveDay.list[12].main.temp - 273.15) * 1.8 + 32;
    var tempTwo = tempTwoF.toFixed(1);
    var tempThreeF = (responseFiveDay.list[20].main.temp - 273.15) * 1.8 + 32;
    var tempThree = tempThreeF.toFixed(1);
    var tempFourF = (responseFiveDay.list[28].main.temp - 273.15) * 1.8 + 32;
    var tempFour = tempFourF.toFixed(1);
    var tempFiveF = (responseFiveDay.list[36].main.temp - 273.15) * 1.8 + 32;
    var tempFive = tempFiveF.toFixed(1);

    var day1 = responseFiveDay.list[4].dt_txt;
    var day2 = responseFiveDay.list[12].dt_txt;
    var day3 = responseFiveDay.list[20].dt_txt;
    var day4 = responseFiveDay.list[28].dt_txt;
    var day5 = responseFiveDay.list[36].dt_txt;

    // appending values from API into html for each of the 5 days
    $("#day-1").html("<h5>" + day1.substr(0, 10) + "</h5>");
    $("#day-1").append("<img src=" + icon1url + ">");
    $("#day-1").append("<p>" + "Temp: " + tempOne + " °F </p>");
    $("#day-1").append("<p>" + "Humidity: " + responseFiveDay.list[4].main.humidity + " % </p>");

    $("#day-2").html("<h5>" + day2.substr(0, 10) + "</h5>");
    $("#day-2").append("<img src=" + icon2url + ">");
    $("#day-2").append("<p>" + "Temp: " + tempTwo + " °F </p>");
    $("#day-2").append("<p>" + "Humidity: " + responseFiveDay.list[12].main.humidity + " % </p>");

    $("#day-3").html("<h5>" + day3.substr(0, 10) + "</h5>");
    $("#day-3").append("<img src=" + icon3url + ">");
    $("#day-3").append("<p>" + "Temp: " + tempThree + " °F </p>");
    $("#day-3").append("<p>" + "Humidity: " + responseFiveDay.list[20].main.humidity + " % </p>");

    $("#day-4").html("<h5>" + day4.substr(0, 10) + "</h5>");
    $("#day-4").append("<img src=" + icon4url + ">");
    $("#day-4").append("<p>" + "Temp: " + tempFour + " °F </p>");
    $("#day-4").append("<p>" + "Humidity: " + responseFiveDay.list[28].main.humidity + " % </p>");

    $("#day-5").html("<h5>" + day5.substr(0, 10) + "</h5>");
    $("#day-5").append("<img src=" + icon5url + ">");
    $("#day-5").append("<p>" + "Temp: " + tempFive + " °F </p>");
    $("#day-5").append("<p>" + "Humidity: " + responseFiveDay.list[36].main.humidity + " % </p>");

  });
}
// call fiveDayForecast function
fiveDayForecast();

// searchbox functionality
$("button").on("click", function(event) {
  event.preventDefault();
  
  let apiKey = '4fbbb274cc7965f5029fef1b41f5f697';
  var getWeather = $("#get-weather");
  // creates var from text input in searchbox
  var city = getWeather.val().trim();
  // adds text to cities variable
  cities.push(city)
  var message = document.querySelector(".invalid-message");

  console.log(getWeather);
  // store values entered into searchbox to local storage
  function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities));
  }
    // if else to ensure user inputs valid text
  if (city === null || city === "" ){
    message.innerHTML = "Invalid input. Please try again!";
  } else {
    message.innerHTML = "";
    renderCities();
    storeCities();
    getCities();
  }
    // need to get search-data class to prepend a new li or P with what the users search for
    function renderCities() {
      $(".search-data").prepend("<p>" + city + "</p>");
    }
    

    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&q=" +
    city + "&appid=" + apiKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
})  

  .then(function(response) {
    // query log
    console.log(queryURL);
    // object log
    console.log(response);
    // transfering object information to html
    let iconCode = response.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    
    $(".city").html("<h1>" + response.name + "</h1>");
    // converts to F
    $(".temp").text(
      "Temperature: " + ((response.main.temp -273.15) * 1.8 +32).toFixed(0) + " F");
    $(".humidity").text("Humidity: " + response.main.humidity + " %");
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#wicon").attr("src", iconurl);
    $('#index').text("UV: "+ index);

});
  // five day section for when user searches for new city
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  $.ajax({
    url: fiveDay,
    method: "GET"
  }).then(function(responseFiveDay) {
    console.log(fiveDay);
    // icons for five day section
    var icon1 = responseFiveDay.list[4].weather[0].icon;
    var icon1url = "http://openweathermap.org/img/w/" + icon1 + ".png";
  
    var icon2 = responseFiveDay.list[4].weather[0].icon;
    var icon2url = "http://openweathermap.org/img/w/" + icon2 + ".png";
  
    var icon3 = responseFiveDay.list[4].weather[0].icon;
    var icon3url = "http://openweathermap.org/img/w/" + icon3 + ".png";
  
    var icon4 = responseFiveDay.list[4].weather[0].icon;
    var icon4url = "http://openweathermap.org/img/w/" + icon4 + ".png";
  
    var icon5 = responseFiveDay.list[4].weather[0].icon;
    var icon5url = "http://openweathermap.org/img/w/" + icon5 + ".png";

    // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
    var tempOneF = (responseFiveDay.list[4].main.temp - 273.15) * 1.8 + 32;
    var tempOne = tempOneF.toFixed(1);
    var tempTwoF = (responseFiveDay.list[12].main.temp - 273.15) * 1.8 + 32;
    var tempTwo = tempTwoF.toFixed(1);
    var tempThreeF = (responseFiveDay.list[20].main.temp - 273.15) * 1.8 + 32;
    var tempThree = tempThreeF.toFixed(1);
    var tempFourF = (responseFiveDay.list[28].main.temp - 273.15) * 1.8 + 32;
    var tempFour = tempFourF.toFixed(1);
    var tempFiveF = (responseFiveDay.list[36].main.temp - 273.15) * 1.8 + 32;
    var tempFive = tempFiveF.toFixed(1);

    var day1 = responseFiveDay.list[4].dt_txt;
    var day2 = responseFiveDay.list[12].dt_txt;
    var day3 = responseFiveDay.list[20].dt_txt;
    var day4 = responseFiveDay.list[28].dt_txt;
    var day5 = responseFiveDay.list[36].dt_txt;

    

    // appends html with data from the city the user searches for
    $("#day-1").html("<h5>" + day1.substr(0, 10) + "</h5>");
    $("#day-1").append("<img src=" + icon1url + ">");
    $("#day-1").append("<p>" + "Temp: " + tempOne + " °F </p>");
    $("#day-1").append("<p>" + "Humidity: " + responseFiveDay.list[4].main.humidity + " % </p>");
  
    $("#day-2").html("<h5>" + day2.substr(0, 10) + "</h5>");
    $("#day-2").append("<img src=" + icon2url + ">");
    $("#day-2").append("<p>" + "Temp: " + tempTwo + " °F </p>");
    $("#day-2").append("<p>" + "Humidity: " + responseFiveDay.list[12].main.humidity + " % </p>");
  
    $("#day-3").html("<h5>" + day3.substr(0, 10) + "</h5>");
    $("#day-3").append("<img src=" + icon3url + ">");
    $("#day-3").append("<p>" + "Temp: " + tempThree + " °F </p>");
    $("#day-3").append("<p>" + "Humidity: " + responseFiveDay.list[20].main.humidity + " % </p>");
  
    $("#day-4").html("<h5>" + day4.substr(0, 10) + "</h5>");
    $("#day-4").append("<img src=" + icon4url + ">");
    $("#day-4").append("<p>" + "Temp: " + tempFour + " °F </p>");
    $("#day-4").append("<p>" + "Humidity: " + responseFiveDay.list[28].main.humidity + " % </p>");
  
    $("#day-5").html("<h5>" + day5.substr(0, 10) + "</h5>");
    $("#day-5").append("<img src=" + icon5url + ">");
    $("#day-5").append("<p>" + "Temp: " + tempFive + " °F </p>");
    $("#day-5").append("<p>" + "Humidity: " + responseFiveDay.list[36].main.humidity + " % </p>");
  });
    

})
// pull from local storage
function getCities(){
  var getCity = localStorage.getItem("cities");
  console.log(getCity);
  
}

