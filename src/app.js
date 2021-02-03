function search(city) {
	let apiKey = "24029506eac6ecf0aabddf3cd4ab6120";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(showTemperature);
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
	// console.log(response.data);
	document.querySelector(".temperature").innerHTML = Math.round(
		response.data.main.temp
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

//setting up celcius to fahrenheit conversion

let temperature = document.querySelector(".temperature");

let celciusTemperature = Math.round(temperature);
let fahrenheitTemperature = Math.round(celciusTemperature * 2 + 30);

function convertCelcius() {
	temperature.innerHTML = 21;
}

function convertFahrenheit() {
	let fahrenheitTemperature = Math.round(21 * 2 + 28);
	temperature.innerHTML = `${fahrenheitTemperature}`;

	let celcius = document.querySelector(".celcius");
	let fahrenheit = document.querySelector(".fahrenheit");

	celcius.addEventListener("click", convertCelcius);
	fahrenheit.addEventListener("click", convertFahrenheit);
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

search("Tokyo");
