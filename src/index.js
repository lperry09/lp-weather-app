// Feature: Display Current Date and Time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Feature: Temperature

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tues"];

  forecast.forEach((forecastDay, index) => {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2"> 
        <div class="weather-forecast-date">${formatDay(
          forecastDay.time
        )}<br/><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt=""width="42"/>
        </div>
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-maximum">${Math.round(
            forecastDay.temperature.maximum
          )}&deg</span> | <span class="weather-forecast-minimum">${Math.round(
          forecastDay.temperature.minimum
        )}&deg</span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "bf43f3653d603cc4t8adcf005bodbea9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);

  let city = document.querySelector(".current-city");
  city.innerHTML = `${response.data.city}`;

  let h2 = document.querySelector(".current-temperature");
  h2.innerHTML = `${temperature}`;

  let humidityData = response.data.temperature.humidity;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${humidityData}%`;

  let windSpeedData = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${windSpeedData} km/h`;

  document.querySelector(".weather-description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector(".current-icon");

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  //celsiusTemperature = response.data.temperature.current;
  //fahrenheitTemperature = convertCelsiusToFahrenheit(celsiusTemperature);

  getForecast(response.data.coordinates);
}

function citySearch(event) {
  event.preventDefault(showCurrentPosition);

  let apiKey = "bf43f3653d603cc4t8adcf005bodbea9";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);

  city.innerHTML = citySearch.value;
}

let inputCity = document.querySelector("#search-button");
inputCity = addEventListener("submit", citySearch);

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "bf43f3653d603cc4t8adcf005bodbea9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentLocate = document.querySelector("#current-city-button");
currentLocate.addEventListener("click", showGeoLocation);

//let celsiusTemperature = null;

//function convertCelsiusToFahrenheit(celsius) {
//let fahrenheit = (celsius * 9) / 5 + 32;
//return Math.round(fahrenheit);
//}

//function convertFahrenheitToCelsius(fahrenheit) {
//let celsius = ((fahrenheit - 32) * 5) / 9;
//return Math.round(celsius);
//}

//function displayCelsiusTemperature(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".current-temperature");
//let celsiusTemperature = convertFahrenheitToCelsius(fahrenheitTemperature);
//temperatureElement.innerHTML = Math.round(celsiusTemperature);
//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.classList.add("active");
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.classList.remove("active");
//}

//function displayFahrenheitTemperature(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".current-temperature");
//temperatureElement.innerHTML = `${fahrenheitTemperature}`;
//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.classList.remove("active");
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.classList.add("active");
//}

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", displayCelsiusTemperature);

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

displayForecast();
