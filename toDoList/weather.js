const WEATHER=document.querySelector(".js-weather")
const API_KEY="adcbb3096570e803ce5db24b1b1775a0";
const COORDS='coords';
const Token="629b76278fe5caf9bf5d5f5bc499550caedf2bfb"

function getAirPollution(lat,lng){
    fetch(`http://api.waqi.info/feed/geo:${lat};${lng}/?token=${Token}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const pm10=json.data.iaqi.pm10.v;
        const pm25=json.data.iaqi.pm25.v;
        WEATHER.innerText=`pm2.5 : ${pm25}     ${determine25()} \n  pm10  : ${pm10}     ${determine10()} `
        WEATHER.classList.add("weatherSize");
        console.log(json);
    })
}
function determine10(pm10){
    let value="";
    if(pm10>80){
        value="Danger!"
    }
    else if(pm10<31){
        value="Good!!";
    }
    else{
        value="Not bad.";
    }
    return value;
}
function determine25(pm25){
    let value="";
    if(pm25>35){
        value="Danger!"
    }
    else if(pm25<16){
        value="Good!!";
    }
    else{
        value="Not bad";
    }
    return value;
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
    getAirPollution(latitude,longitude);
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
        getAirPollution(parsedCoords.latitude,parsedCoords.longitude);
    }
}
function init(){
    loadcoords();
}



init();