const userTab=document.querySelector("[ data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantLocationContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userinfocontainer=document.querySelector(".user-info-container");

//Initially variable need
let currentTab=userTab;
let API_KEY="6e14cc5654cc4c13e32c7772047013ed";
currentTab.classList.add("current-tab");

function searchTab(clickedTab)
{
    if(clickedTab!=currentTab)
    {
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");
    }
}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})


