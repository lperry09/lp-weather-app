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
  let temperature = Math.round(response.data.main.temp);

  let city = document.querySelector(".current-city");
  city.innerHTML = `${response.data.name}`;

  let h2 = document.querySelector(".current-temperature");
  h2.innerHTML = `${temperature}&degF`;

  let humidityData = response.data.main.humidity;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${humidityData}%`;

  let windSpeedData = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${windSpeedData} km/h`;

  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].main;
}

function citySearch(event) {
  event.preventDefault(showCurrentPosition);

  let apiKey = "25dc8dab76c93d4db8db9e680160f3ab";
  let city = document.querySelector(".city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);

  city.innerHTML = citySearch.value;
}

let inputCity = document.querySelector("#search-button");
inputCity = addEventListener("submit", citySearch);

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "25dc8dab76c93d4db8db9e680160f3ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentLocate = document.querySelector("#current-city-button");
currentLocate.addEventListener("click", showGeoLocation);
