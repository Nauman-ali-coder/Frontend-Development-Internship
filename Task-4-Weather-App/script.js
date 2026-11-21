const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const statusText = document.getElementById("status");
const weatherDiv = document.getElementById("weather");
const historyDiv = document.getElementById("history");

let searches = JSON.parse(localStorage.getItem("weatherSearches") || "[]");

function showHistory() {
  historyDiv.innerHTML = "";
  searches.forEach(function (city) {
    const button = document.createElement("button");
    button.textContent = city;
    button.addEventListener("click", function () {
      getWeather(city);
    });
    historyDiv.appendChild(button);
  });
}

async function getWeather(city) {
  statusText.textContent = "Loading...";
  statusText.className = "loading";
  weatherDiv.innerHTML = "";

  try {
    // First, find the city's latitude and longitude
    const locationResponse = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) + "&count=1"
    );
    if (!locationResponse.ok) throw new Error("Could not connect to the API.");

    const locationData = await locationResponse.json();
    if (!locationData.results || locationData.results.length === 0) {
      throw new Error("City not found. Please try another name.");
    }

    const place = locationData.results[0];

    // Then, get current weather using the coordinates
    const weatherResponse = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      place.latitude + "&longitude=" + place.longitude +
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
    );
    if (!weatherResponse.ok) throw new Error("Weather data is not available.");

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    weatherDiv.innerHTML =
      '<div class="weather-card">' +
      '<h2>' + place.name + ', ' + (place.country || "") + '</h2>' +
      '<div class="temp">' + current.temperature_2m + ' °C</div>' +
      '<p>Humidity: ' + current.relative_humidity_2m + '%</p>' +
      '<p>Wind Speed: ' + current.wind_speed_10m + ' km/h</p>' +
      '</div>';

    statusText.textContent = "";

    searches = [city, ...searches.filter(item => item.toLowerCase() !== city.toLowerCase())].slice(0, 3);
    localStorage.setItem("weatherSearches", JSON.stringify(searches));
    showHistory();

  } catch (error) {
    statusText.textContent = error.message;
    statusText.className = "error";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

showHistory();
