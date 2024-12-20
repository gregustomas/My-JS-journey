//definice potřebných HTML elementů a API

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "aaedc0fb9d27c28704441eebf70877a9"; 

//hlavní funkce, která spouští získání a nahrání dat, případně error
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Enter city");
    }
})

//vyhledání města co chci získáí dat z APIny a převedení do JSON
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch");
    }

    return await response.json();
}

//destrukturizace objektu z API url => nový objekt. reset karty, vytvoření elementu, přidání class, přiřazení do DOM 
function displayWeatherInfo(data) {
    const {name: city, main: {temp, humidity}, weather: [{description}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.floor(temp - 273.15)}°`;
    humidityDisplay.textContent = `vlhkost: ${humidity}`;
    descDisplay.textContent = description;

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
}

//error handle
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}