function showTemperature(response) {
	console.log(response.data);
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

function search(city) {
	let apiKey = "24029506eac6ecf0aabddf3cd4ab6120";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(showTemperature);
}

search("Atlanta");
