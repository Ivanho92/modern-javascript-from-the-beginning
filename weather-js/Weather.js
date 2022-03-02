class Weather {
    constructor() {
        this.apiKey = 'e47b02b158c7578d799e74b5d092e0eb';
    }

    async getWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${this.apiKey}&units=metric`);   
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        return data;
    }
}