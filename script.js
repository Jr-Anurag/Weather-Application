


const userTab = document.querySelector("[ data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantLocationContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userinfoContainer = document.querySelector(".user-info-container");

//Initially variable need
let currentTab = userTab;
let API_KEY = "6e14cc5654cc4c13e32c7772047013ed";
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if (newTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = newTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            //kya search wala form invisible hai to use visible karao
            userinfoContainer.classList.remove("active");
            grantLocationContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // main pahle search wale tab pr tha ab your weather wale pr hoo
            userinfoContainer.classList.remove("active");
            searchForm.classList.remove("active");
            //ab mai your weather wale pr aa gaya hu to weather display krna pdega, so let's check localstorage first 
            //for coordinates, if we have saved them there
            getfromSessionStorage();
        }

    }
}

userTab.addEventListener("click", () => {
    //pass newTab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass newTab as input parameter
    switchTab(searchTab);
});

function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantLocationContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


async function fetchUserWeatherInfo(coordinates)
{
    const{lat,lon}= coordinates;
    grantLocationContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    try{
        const response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data= await response.json();
        loadingScreen.classList.remove("active");
        userinfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err)
    {
      loadingScreen.classList.remove("active");
    }
    
}


function renderWeatherInfo(weatherInfo) {
    //firstly, we have to fetch elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const weatherDesc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // fetch values from weatherInfo and put in UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/48x36/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0].icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;


}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("error aaya");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}


const grantAccessBtn=document.querySelector("[data-grantAccess]");
grantAccessBtn.addEventListener("click",getLocation);


const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityname=searchInput.value;
     if(cityname === ""){
        return;
     }
     else
     fetchSearchWeatherInfo(cityname);
})

async function fetchSearchWeatherInfo(cityname)
{
    loadingScreen.classList.add("active");
    userinfoContainer.classList.remove("active");
    grantLocationContainer.classList.remove("active");

    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);
        const data= await response.json();
        loadingScreen.classList.remove("active");
        userinfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
      console.log("error aa raha hai search wale me");
    }
}


























