const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("#input-box");
const temElement = document.querySelector(".tempreture");
const locationElem = document.querySelector(".location");
const timeElem = document.querySelector(".time");
const day = document.querySelector(".Day");
const dateElem = document.querySelector(".Date");
const weather = document.querySelector(".emoji");
const condit = document.querySelector(".condition");
const windSpeed = document.querySelector(".wind");
const humidity = document.querySelector(".humidity")



searchBtn.addEventListener("click", async function () {
   
    const location = searchInput.value;

    if (location != "") {
        const data = await fetchWeather(location)
        if (data !== null) {
            updateDOM(data);
        }
        searchInput.value = "";
    }
})

function updateDOM(data) {
    console.log("hi", data);
    const tempreture = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime
    const [date, time] = timeData.split(" ");
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text;
    const windSp = data.current.wind_kph;
    const hum = data.current.humidity;
    // console.log("temp:", tempreture, "location:", location, "Date", date, "time:", time, "link", iconLink);
    temElement.textContent = tempreture + "°C";
    locationElem.textContent = location;
    timeElem.textContent = time;
    dateElem.textContent = date;
    weather.src = iconLink;
    condit.textContent =condition;
    windSpeed.textContent = "Wind:-  " + windSp + "Km/h";
    humidity.textContent ="Humidity:-  " + hum + "%";
}

async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=2150deb4a1554fb4b1f122124242009&q=${location}&aqi=no`
    const response = await fetch(url)
    if (response.status == 400) {
        alert("Location Is Invalid");
    }
    else if (response.status == 200) {
        const json = await response.json();
        return json;
    }
}
