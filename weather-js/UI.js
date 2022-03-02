class UI {
    constructor() {
        this.modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('changeLocationModal'));

        this.alertBox = document.getElementById('alert-box');

        this.locationEL = document.getElementById('location');
        this.weatherDescriptionEL = document.getElementById('weather-description');
        this.temperatureEL = document.getElementById('temperature');
        this.weatherIconEL = document.getElementById('weather-icon');
        this.weatherDetailsEL = document.getElementById('weather-details');
    }

    displayInfo(weatherData) {
        this.locationEL.innerText = weatherData.name;
        this.weatherDescriptionEL.innerText = weatherData.weather[0].description;
        this.temperatureEL.innerText = weatherData.main.temp+'°';
        this.weatherIconEL.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
        this.weatherDetailsEL.innerHTML = `
            <li class="list-group-item text-secondary">Relative Humidity: ${weatherData.main.humidity}</li>
            <li class="list-group-item text-secondary">Feels like: ${weatherData.main.feels_like}°</li>
            <li class="list-group-item text-secondary">Wind: ${(weatherData.wind.speed * 1.609344).toFixed(1)} km/h</li>
        `;
    }

    displayError(error) {
        this.alertBox.classList.remove('d-none');
        this.alertBox.innerText = error;
        setTimeout(() => this.alertBox.classList.add('d-none') ,3000)
    }

    showSpinner(spinner) {
        spinner.classList.remove('d-none');
    }

    hideSpinner(spinner) {
        spinner.classList.add('d-none');
    }
}