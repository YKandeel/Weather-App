const apiKey = "your API key";

function fetchWeather() {
    const city = document.getElementById("city-input").value.trim();
    const weatherInfo = document.getElementById("weather-info");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${icon}" alt="${data.weather[0].description}" />
        <p><strong>${data.main.temp}°C</strong></p>
        <p>${data.weather[0].description}</p>
      `;
        })
        .catch(() => {
            weatherInfo.innerHTML = `<p style="color:red;">City not found. Try again.</p>`;
        });
}

// Existing button click listener
document.getElementById("search-btn").addEventListener("click", fetchWeather);

// New: Listen for Enter key on input field
document.getElementById("city-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});
