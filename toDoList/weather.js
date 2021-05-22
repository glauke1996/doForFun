const WEATHER=document.querySelector(".js-weather")
const API_KEY="adcbb3096570e803ce5db24b1b1775a0";
const COORDS='coords';
const WS='.normal'

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp=json.main.temp;
        const place=json.name;
        const weath=json.weather[0].main
        WEATHER.classList.add(WS);
        WEATHER.innerText=`${temp} ℃    ${place}  \n Weather :  ${weath}`
        console.log(json);
    })
}

function saveTheCoords(coordsOBJ){
    localStorage.setItem(COORDS,JSON.stringify(coordsOBJ));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsOBJ={
        latitude,
        longitude
    }
    saveTheCoords(coordsOBJ);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("can't  access geo location.")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
    //API that get location of user
}


function loadcoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();

    }else{
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}
function init(){
    loadcoords();
}



init();