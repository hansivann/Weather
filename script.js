console.log('hello there');

// get api key from weatherapi.com
let weather = {
    "apiKey": "1234567890",
    fetchWeather: function (city) {
        fetch("https://api.weatherapi.com/v1/current.json?key={API KEY}=" + city + "&aqi=yes")
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },


    displayWeather: function(data) {
        const { name, region, localtime } = data.location;
        const { temp_f, condition, icon} = data.current;
        const { humidity, feelslike_f } = data.current;
        console.log( name, region, localtime, temp_f, condition, icon, humidity, feelslike_f);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp_f + "°F";
        document.querySelector(".icon").src = condition.icon;
        document.querySelector(".description").innerText = condition.text;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".feels").innerText = "Feels Like: " + feelslike_f + "°F";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.background = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchbar").value)
    }
};

document
.querySelector(".search button")
.addEventListener("click", function () {
weather.search();
})
 
document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search(); 
    }
})

weather.fetchWeather("Los Angeles");