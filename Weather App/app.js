const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FC_URL = "https://api.open-meteo.com/v1/forecast";

let controller = new AbortController();
const weatherContainer = document.querySelector(".current-weather-container");
const forecastContainer = document.querySelector(".forecast-container");

const Inputs = {
    cityNameInput : document.getElementById("city-input"),
    searchBtn : document.getElementById("search-btn"),
    defaultLocationBtn : document.getElementById("default-location-btn")
}

const CityInfo = {
    cityName : document.querySelector(".city-name"),
    cityLocation : document.querySelector(".city-location"),
    degree : document.querySelector(".degree"),
    humidity : document.querySelector(".humidity"),
    wind : document.querySelector(".wind"),
    localTime : document.querySelector(".local-time"),
    forecastData : document.querySelector(".forecast-data")
}

Inputs.defaultLocationBtn.addEventListener("click", async () => {
    disableButtons(true);
    await loadData("Sanaa");
    disableButtons(false);
});

Inputs.searchBtn.addEventListener("click", async () => {
    let cityName = Inputs.cityNameInput.value.trim();
    if(cityName === ""){
        alert("Please enter a city name");
        return;
    }

    disableButtons(true);
    await loadData(cityName);
    disableButtons(false);
});

Inputs.cityNameInput.addEventListener("keydown", e => {
    if(e.key === "Enter") Inputs.searchBtn.click();
});

function disableButtons(value){
    Inputs.defaultLocationBtn.disabled = value;
    Inputs.searchBtn.disabled = value;
}

async function loadData(city){
    try {
        controller.abort();
        controller = new AbortController();

        let cityData = await fetchCityData(city, controller.signal);
        let forecastData = await fetchWeatherForecast(cityData.latitude, cityData.longitude, controller.signal);

        renderCurrentWeather(cityData, forecastData);
        renderForecast(forecastData);

    } catch (error) {
        alert(error.message);
    }
}

function renderCurrentWeather(cityData, forecastData){
    weatherContainer.style.display = "flex";
    CityInfo.cityName.textContent = `${cityData.name}, ${cityData.country}`;
    CityInfo.cityLocation.textContent = `Lat/Lon: ${cityData.latitude.toFixed(2)}, ${cityData.longitude.toFixed(2)}`;
    
    CityInfo.degree.textContent = `${forecastData.current.temperature_2m}°C`;
    CityInfo.humidity.textContent = `Humidity: ${forecastData.current.relative_humidity_2m}%`;
    CityInfo.wind.textContent = `Wind Speed: ${forecastData.current.wind_speed_10m} km/h`;

    CityInfo.localTime.textContent = `Local Time: ${new Date(forecastData.current.time).toLocaleString("en-US", { timeZone: forecastData.timezone })}`;
}

function renderForecast(forecastData){
    CityInfo.forecastData.innerHTML = "";
    forecastData.daily.time.forEach((date, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${new Date(date).toLocaleDateString()}</td>
            <td>${forecastData.daily.temperature_2m_min[index]}°C</td>
            <td>${forecastData.daily.temperature_2m_max[index]}°C</td>
            <td>${forecastData.daily.precipitation_sum[index]}mm</td>
        `;

        CityInfo.forecastData.appendChild(tr);
    })
}

async function fetchAPI(ENDPOINT, signal){
    try{
        toggleLoader(true);
        let res = await fetch(ENDPOINT, {signal: signal});
        if(!res.ok)
            throw new Error("Failed to fetch data");

        return await res.json();
    }catch(error){
        console.log(error);
        return null;
    }finally{
        toggleLoader(false);
    }
}

async function fetchWeatherForecast(lat, lon, signal){
    let url = new URL(FC_URL);
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("current", "temperature_2m,relative_humidity_2m,wind_speed_10m");
    url.searchParams.set("daily", "temperature_2m_min,temperature_2m_max,precipitation_sum");
    url.searchParams.set("timezone", "auto");

    let forecastData = await fetchAPI(url, signal);

    if(!forecastData)
        throw new Error("Failed to fetch weather forecast");
        
    return forecastData;
}

async function fetchCityData(name, signal){
    let url = new URL(GEO_URL);
    url.searchParams.set("name", name);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    let cityData = await fetchAPI(url, signal);

    if(!cityData.results || cityData.results.length === 0)
        throw new Error("City not found");

    return cityData.results[0];
}

function toggleLoader(show){
    if(show){
        const loader = document.createElement('div');
        loader.classList.add("loader");
        loader.innerHTML = `
            <div class="spinner"></div>
            <p>Loading...</p>
        `;

        document.querySelector(".container")?.insertBefore(loader, document.body.querySelector(".cards-area"));
    }
    else
        document.querySelector(".loader")?.remove();
}

loadData("Sanaa");