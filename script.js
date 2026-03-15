const apikey = "f0c861e176431e825f0c058033af73ce";

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".cloud-img");

async function checkWeather(city) {

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherImg.src = "img/cloud.png";
        }
        else if (data.weather[0].main === "Clear") {
            weatherImg.src = "img/clear.png";
        }
        else if (data.weather[0].main === "Rain") {
            weatherImg.src = "img/rainy.png";
        }

        document.querySelector('.error').style.display = "none";
        document.querySelector('.weather').style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = "";
});

checkWeather("Delhi");