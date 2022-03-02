// Init classes
const weather = new Weather;
const ui = new UI;
const weatherStorage = new LocalStorage;

// Variables declarations
const cityInput = document.getElementById('city');
const spinner = document.getElementById('loader');

// Display by default user's weather from Local Storage (if any, otherwise Brussels is set by default)
let weatherLocation = weatherStorage.getLocation();
ui.showSpinner(spinner);

weather.getWeather(weatherLocation)
        .then(data => {
            ui.hideSpinner(spinner);
            ui.displayInfo(data);
        })
        .catch(error => console.error(error));

// Changing location code
document.getElementById('submit-location').addEventListener('click', e => {
    e.preventDefault();

    if (cityInput.value) {
        weather.getWeather(cityInput.value)
        .then(data => {
            weatherStorage.storeLocation(data.name);
            ui.displayInfo(data)
            ui.modal.hide();
        })
        .catch(error => {
            if (error.message.includes('404')) {
                ui.displayError('The city you entered is not recognized. Please try again.')
            } else {
                console.error(error);
                ui.displayError('Something went wrong. Error status: ' + error.message)
            }
        });  
    } else {
        ui.displayError('Please enter a city.');
    }
})