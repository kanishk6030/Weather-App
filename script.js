const API_KEY = 'dee5232c0561498bb6b223053241810';
const URL =`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

let searchBox = document.querySelector('.search-box');
let showTemp = document.querySelector('.temperature');
let showTempText = document.querySelector('.real-temp p');
let showTempimg = document.querySelector('.real-temp img');
let currentlocation = document.querySelector('.fa-location-crosshairs');
let humidity = document.querySelector('.humidity');
let country = document.querySelector('.country');
let pressure = document.querySelector('.pressure');
let wind = document.querySelector('.wind');
let searchIcon = document.querySelector('.fa-magnifying-glass');



// activating currlocation as default(Muzaffarpur)
const currLocation = () =>{
    searchBox.value = "Muzaffarpur";
    updateTemp("Muzaffarpur");
    
}
currentlocation.addEventListener('click',currLocation);
//Taking user input from the user in the search box
searchBox.addEventListener('keyup' , (e)=>{
    let cityName = searchBox.value.trim();
    if (e.key == 'Enter' && cityName){
        updateTemp(cityName);
    }
})



let updateTemp = async(cityName)=>{
    try{
        let response = await fetch(`${URL}&q=${cityName}&days=2`);
        let data = await response.json();
        console.log(data);

        let text = data.current.condition.text;
        let src = data.current.condition.icon;


        showTempimg.src = src;
        showTemp.innerHTML = `<h2 class="temperature">${data.current.temp_c}<sup>&degC</sup></h2>`;
        showTempText.innerText = text;

        humidity.innerText = data.current.humidity;
        wind.innerText = `${data.current.wind_kph}`;
        pressure.innerText = `${data.current.pressure_in}`;
        country.innerText = data.location.country;
    }
    catch(error){
        console.log(error);
    }
}
