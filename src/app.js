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
}

let apiKey = "0cade312aa440618836af6e6fd05e7ad";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=mashhad&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayInformation);
