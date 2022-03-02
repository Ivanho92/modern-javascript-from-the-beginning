class LocalStorage {
    constructor() {
        this.city = '';
        this.defaultCity = 'Brussels';
    }

    getLocation() {
        localStorage.getItem('weatherLocation') === null ? this.city = this.defaultCity : this.city = localStorage.getItem('weatherLocation');
        return this.city;
    }

    storeLocation(newLocation) {
        localStorage.setItem('weatherLocation', newLocation);
    }
}