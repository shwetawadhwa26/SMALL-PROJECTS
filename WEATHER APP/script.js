function getWeather() {
    const apiKey = '4fd8b8d344278340ce69daa4b21dc522';
    const city = document.getElementById('city').value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    // Current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod != 200) {
                throw new Error(data.message);
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error('Current weather error:', error);
            alert('Weather API error: ' + error.message);
        });

    // Hourly forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod != "200") {
                throw new Error(data.message);
            }
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Forecast error:', error);
            alert('Forecast API error: ' + error.message);
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const next24Hours = hourlyData.slice(0, 8); // next 24h

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours().toString().padStart(2, '0');
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        hourlyForecastDiv.innerHTML += `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
