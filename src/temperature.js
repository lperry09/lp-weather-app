function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = `<div class="row">
              <div class="col-2"> 
                <div class="weather-forecast-date">Thursday <img src="" alt=""/>
                </div>
                  <div class="weather-forecast-temperature">
                    <span class="weather-forecast-maximum">18&deg</span> | <span class="weather-forecast-minimum">12&deg</span>
                  </div>
              </div>    
            </div>`;
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

  celsiusTemperature = response.data.temperature.current;
  fahrenheitTemperature = convertCelsiusToFahrenheit(celsiusTemperature);
}

function citySearch(event) {
  event.preventDefault(showCurrentPosition);

  let apiKey = "bf43f3653d603cc4t8adcf005bodbea9";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  city.innerHTML = citySearch.value;
}

let inputCity = document.querySelector("#search-button");
inputCity = addEventListener("submit", citySearch);

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "bf43f3653d603cc4t8adcf005bodbea9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentLocate = document.querySelector("#current-city-button");
currentLocate.addEventListener("click", showGeoLocation);

let celsiusTemperature = null;

function convertCelsiusToFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  return Math.round(fahrenheit);
}

function convertFahrenheitToCelsius(fahrenheit) {
  let celsius = ((fahrenheit - 32) * 5) / 9;
  return Math.round(celsius);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  let celsiusTemperature = convertFahrenheitToCelsius(fahrenheitTemperature);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.add("active");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = `${fahrenheitTemperature}`;
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove("active");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

displayForecast();
