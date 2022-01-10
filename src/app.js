function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedbesday",
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
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
}
function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector("#currentDegree").innerHTML = celsiusTemperature;
}
function displayForecast() {
  let days = ["Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  debugger;
  days.forEach(function (day) {
    forecastHTML += `<div class="col-sm-2">
            <div class="cards">
              <div class="card">
                <div class="card-body">${day}</div>
                <img
                  class="card-img-top"
                  src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png"
                  width="50px"
                />
                <div class="card-title">
                  H : 4° <br />
                  L : -2°
                </div>
              </div>
            </div>
          </div>`;
  });
  forecastHTML += `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let farenhaitTemperature = null;

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

displayForecast();
