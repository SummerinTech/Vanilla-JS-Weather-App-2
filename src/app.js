//date code

let date = document.querySelector(".date");

let now = new Date();
let dateCurrent = now.getDate();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
let month = months[now.getMonth()];

date.innerHTML = `${day} ${month} ${dateCurrent}, ${year}  ${hour}:${minute}`;

function formatHours(timestamp) {
	return `${hours}:${minutes}`;
}

function showForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	let forecast = response.data.list[0];
	forecastElement.innerHTML = `	
			<div class="col-2 4">
				<h5 id="forecast-one"> 12:00 </h5>
				<img src="https://openweathermap.org/img/wn/${
					forecast.weather[0].icon
				}.png" alt=" "/>
					
					<div class="weather-forecast-temperature">
						<strong>${Math.round(forecast.main.temp_max)}</strong>°/${Math.round(
		forecast.main.temp_min
	)}°
			</div>
					</div>
	`;
}

function search(city) {
	let apiKey = "24029506eac6ecf0aabddf3cd4ab6120";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(showTemperature);

	let apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiForecastUrl).then(showForecast);
}

function searchCity(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-input").value;
	let h1 = document.querySelector("h1");
	h1.innerHTML = searchInput;
	search(searchInput);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
	let weatherIcon = document.querySelector(".main-img");
	weatherIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
	);
	weatherIcon.setAttribute("alt", response.data.weather[0].description);
	celciusTemperature = response.data.main.temp;
	document.querySelector(".temperature").innerHTML = Math.round(
		celciusTemperature
	);
	document.querySelector("h1").innerHTML = response.data.name;
	document.querySelector("#description").innerHTML =
		response.data.weather[0].description;
	document.querySelector(
		".humidity"
	).innerHTML = ` Humidity: ${response.data.main.humidity}%`;
	document.querySelector(".wind-speed").innerHTML = `
		Wind Speed: ${Math.round(response.data.wind.speed)} km/h
	`;
}

// current location button code

function showCurrentTemperature(response) {
	document.querySelector("h1").innerHTML = response.data.name;

	let updatedTemp = document.querySelector(".temperature");
	updatedTemp.innerHTML = Math.round(response.data.main.temp);

	let updatedDescription = document.querySelector("#description");
	updatedDescription.innerHTML = response.data.weather[0].description;

	let updatedSpeed = document.querySelector(".wind-speed");
	updatedSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;

	let updatedHumidity = document.querySelector(".humidity");
	updatedHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function retrievePosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "24029506eac6ecf0aabddf3cd4ab6120";
	let units = "metric";

	let geographicUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

	axios.get(geographicUrl).then(showCurrentTemperature);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector(".current-city");
button.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemp(event) {
	event.preventDefault();
	celcius.classList.remove("active");
	fahrenheit.classList.add("active");
	let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
	temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function dispalyCelciusTemp(event) {
	event.preventDefault();
	celcius.classList.add("active");
	fahrenheit.classList.remove("active");
	temperature.innerHTML = Math.round(celciusTemperature);
}

let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#f");
let celciusTemperature = null;
let temperature = document.querySelector(".temperature");

fahrenheit.addEventListener("click", displayFahrenheitTemp);
celcius.addEventListener("click", dispalyCelciusTemp);

search("Tokyo");
