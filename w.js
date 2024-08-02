const weather = document.querySelector(".weather");
const search = document.querySelector(".search-button");
const cityInput = document.querySelector(".cityInput");
const apikey = "YOUR API KEYS";

search.addEventListener("click", async event => {
    const city = cityInput.value;
    if(city){
        try{
            
            const weatherData = await getWeatherdata(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
})

async function getWeatherdata(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    else{
        return await response.json();
    }
}

function displayWeatherInfo(data){
    console.log(data);
    const {name: city,
           main: {temp, humidity},
           weather: [{description, icon}],
           wind: {speed}} = data;
    
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    weather.textContent = "";
    weather.style.display = "flex";
//Creating weather DIV
    const weatherDiv = document.createElement("div");
    const weatherImg = document.createElement("img");
    const weatherDesc = document.createElement("h3");
    const tempDisplay = document.createElement("h1");
    const cityDisplay = document.createElement("h2");
 //Creating details DIV inside weather DIV
    const detailDiv = document.createElement("div");
  //Creating col1 DIV inside details DIV
    const col1Div = document.createElement("div");
    const humidityImg = document.createElement("img");
    //Creating humidityDiv inside col1 Div
    const humidityDiv = document.createElement("div");
    const humidityP = document.createElement("p");
    const humidityP2 = document.createElement("p");
    //Creating col2 DIV inside details DIV
    const col2Div = document.createElement("div");
    const windImg = document.createElement("img");
  //Creating wind Div inside col2 Div
    const windDiv = document.createElement("div");
    const windP = document.createElement("p");
    const windP2 = document.createElement("p");


//Assigning values to the elements created
    weatherImg.src = iconUrl, alt="Weather Image";
    weatherDesc.textContent = capitalizeWords(description);
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    cityDisplay.textContent = city;
    humidityImg.src = "https://i.postimg.cc/sG50vdsT/humidity.png", alt="Humidity Icon";
    humidityP.textContent = `${humidity}%`;
    humidityP2.textContent = "Humidity";
    windImg.src = "https://i.postimg.cc/14FdW6wD/wind.png";
    windP.textContent = `${speed} Km/h`;
    windP2.textContent = "Wind Speed";

//Assigning CSS properties
    weatherDesc.classList.add("weather-desc");
    detailDiv.classList.add("details");
    col1Div.classList.add("col");
    humidityImg.classList.add("col-img");
    humidityP.classList.add("humidity");
    humidityP2.classList.add("htext")
    col2Div.classList.add("col");
    windImg.classList.add("col-img");
    windP.classList.add("wind");
    windP2.classList.add("wtext")

//Append
//Append to weather Div
    weatherDiv.appendChild(weatherImg);
    weatherDiv.appendChild(weatherDesc);
    weatherDiv.appendChild(tempDisplay);
    weatherDiv.appendChild(cityDisplay);
    weatherDiv.appendChild(detailDiv);
//Append col1 to detail Div
    detailDiv.appendChild(col1Div);
//Append to col1 Div
    col1Div.appendChild(humidityImg);
    col1Div.appendChild(humidityDiv);
//Append to humidity Div
    humidityDiv.appendChild(humidityP);
    humidityDiv.appendChild(humidityP2);
//Append col2 to detail Div
    detailDiv.appendChild(col2Div);
//Append to col2 Div
    col2Div.appendChild(windImg);
    col2Div.appendChild(windDiv);
//Append to wind Div
    windDiv.appendChild(windP);    
    windDiv.appendChild(windP2);
//Append all to card DIV
    weather.appendChild(weatherDiv);

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weather.textContent = "";
    weather.style.display = "flex";
    weather.appendChild(errorDisplay);
}

function capitalizeWords(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}