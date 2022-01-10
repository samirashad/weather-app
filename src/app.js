function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let formattedTime = `${days[currentDate.getDay()]} ${hour}:${minute}`;
  return formattedTime;
}

function formatDay(time) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(time);
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily.slice(0, 6);
  forecast.forEach(function (day) {
    maxTemperaturesCelsius.push(day.temp.max);
    minTemperaturesCelsius.push(day.temp.min);
  });
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day) {
    forecastHTML += `<div class="col-sm-2">
            <div class="cards">
              <div class="card">
                <div class="card-body">${formatDay(day.dt * 1000)}</div>
                <img
                  class="card-img-top"
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png"
                  width="50px"
                />
                <div class="card-title">
                  H : <span class="maxTemp">${Math.round(
                    day.temp.max
                  )}</span>° <br />
                  L : <span class="minTemp">${Math.round(day.temp.min)}</span>°
                </div>
              </div>
            </div>
          </div>`;
  });
  forecastHTML += `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function displayInformation(response) {
  document.querySelector("#currentDegree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentTime").innerHTML = formatDate(
    response.data.dt * 1000
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  farenhaitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  document.querySelector(
    "#weatherIcon"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchBox");
  if (cityInput.value !== "") {
    search(cityInput.value);
    cityInput.value = "";
  } else {
    alert("enter a city");
  }
}

function getCoordinates(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInformation);
}

function handleClickCurrentBtn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

function convertToFarenhait(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  document.querySelector("#currentDegree").innerHTML = farenhaitTemperature;
  let forecastMaxTemperatures = document.querySelectorAll(".maxTemp");
  let forecastMinTemperatures = document.querySelectorAll(".minTemp");
  console.log(forecastMinTemperatures);
  forecastMaxTemperatures.forEach(function (element, index) {
    element.innerHTML = Math.round(
      (maxTemperaturesCelsius[index] * 9) / 5 + 32
    );
  });
  forecastMinTemperatures.forEach(function (element, index) {
    element.innerHTML = Math.round(
      (minTemperaturesCelsius[index] * 9) / 5 + 32
    );
  });
}
function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector("#currentDegree").innerHTML = celsiusTemperature;
  let forecastMaxTemperatures = document.querySelectorAll(".maxTemp");
  let forecastMinTemperatures = document.querySelectorAll(".minTemp");
  forecastMaxTemperatures.forEach(function (element, index) {
    element.innerHTML = Math.round(maxTemperaturesCelsius[index]);
  });
  forecastMinTemperatures.forEach(function (element, index) {
    element.innerHTML = Math.round(minTemperaturesCelsius[index]);
  });
}

let celsiusTemperature = null;

let farenhaitTemperature = null;

let minTemperaturesCelsius = [];

let maxTemperaturesCelsius = [];

let apiKey = "0cade312aa440618836af6e6fd05e7ad";

search("mashhad");
document.querySelector("#searchCity").addEventListener("submit", handleSubmit);

document
  .querySelector("#currentLocation")
  .addEventListener("click", handleClickCurrentBtn);

document
  .querySelector("#fahrenheit")
  .addEventListener("click", convertToFarenhait);

document.querySelector("#celsius").addEventListener("click", convertToCelsius);
