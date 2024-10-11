const apiKey = "e9ba988a1e760424bd4862ca8cf46caa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "*C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const currentTime = new Date();

    // Convert all times to UTC
    const utcCurrentTime = new Date(currentTime.toUTCString());
    const utcSunrise = new Date(sunrise.toUTCString());
    const utcSunset = new Date(sunset.toUTCString());

    // Determine if it's day or night
    const isDay = utcCurrentTime >= utcSunrise && utcCurrentTime <= utcSunset;

    let iconSrc;

    switch (weatherCondition) {
      case "Clouds":
        iconSrc = isDay ? "img/clouds.png" : "img/clouds.png";
        break;
      case "Rain":
        iconSrc = isDay ? "img/rain.png" : "img/rain.png";
        break;
      case "Drizzle":
        iconSrc = isDay ? "img/drizzle.png" : "img/drizzle.png";
        break;
      case "Mist":
        iconSrc = isDay ? "img/mist.png" : "img/mist.png";
        break;
      case "Clear":
        iconSrc = isDay ? "img/clear.png" : "img/night_clear.png";
        break;
      default:
        iconSrc = isDay ? "img/clear.png" : "img/night_clear.png";
        break;
    }

    // Debugging
    console.log(`Current Time (UTC): ${utcCurrentTime}`);
    console.log(`Sunrise (UTC): ${utcSunrise}`);
    console.log(`Sunset (UTC): ${utcSunset}`);
    console.log(`Weather Condition: ${weatherCondition}`);
    console.log(`Time of Day: ${isDay ? 'Day' : 'Night'}`);
    console.log(`Icon Source: ${iconSrc}`);

    weatherIcon.src = iconSrc;
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
