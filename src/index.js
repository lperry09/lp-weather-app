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

// Feature: Search/Current City

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);

  let city = document.querySelector(".current-city");
  city.innerHTML = `${response.data.city}`;

  let h2 = document.querySelector(".current-temperature");
  h2.innerHTML = `${temperature}&degF`;

  let humidityData = response.data.temperature.humidity;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${humidityData}%`;

  let windSpeedData = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${windSpeedData} km/h`;

  document.querySelector(".weather-description").innerHTML =
    response.data.condition.description;

  document.querySelector(".current-icon").innerHTML =
    response.data.condition.icon;
}

function citySearch(event) {
  event.preventDefault(showCurrentPosition);

  let apiKey = "bf43f3653d603cc4t8adcf005bodbea9";
  let city = document.querySelector(".city-input").value;
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
