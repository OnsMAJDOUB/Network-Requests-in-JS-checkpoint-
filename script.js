async function fetchWeather() {
  const weatherLocation = document.getElementById("location").value;
  const apiKey = "974c9060a75504135cd7817f86d3414b"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${weatherLocation}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data); 
    updateWeather(data);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

function updateWeather(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const windSpeed = data.wind.speed;
  const timezone = data.timezone;

  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  document.getElementById("icon").src = iconUrl;
  document.getElementById("city").innerHTML = `Weather in ${city}`;
  document.getElementById(
    "temperature"
  ).innerHTML = `Temperature: ${temperature}°C`;
  document.getElementById(
    "description"
  ).innerHTML = `Description: ${description}`;
  document.getElementById("wind").innerHTML = `Wind Speed: ${windSpeed} m/s`;

  
  const timezoneHours = timezone / 3600;
  document.getElementById("timezone").innerHTML = `Timezone: GMT ${
    timezoneHours >= 0 ? "+" : ""
  }${timezoneHours}`;

  document.getElementById("weather").style.display = "block";
}
