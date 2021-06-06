const AirPollution=document.querySelector(".js-pollution")
const API_KEY="adcbb3096570e803ce5db24b1b1775a0";
const COORDS='coords';
const Token="629b76278fe5caf9bf5d5f5bc499550caedf2bfb"
const ApiKeyForForecast="18c72d09628ab15ef986be5edfd61156"
const Weather=document.querySelector(".js-weather")
const WeIcon=document.querySelector(".js-icon")
const WeIcon2=document.querySelector(".js-icon2")
const WeIcon3=document.querySelector(".js-icon3")

function getAirPollution(lat,lng){
    fetch(`http://api.waqi.info/feed/geo:${lat};${lng}/?token=${Token}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const pm10=json.data.iaqi.pm10.v;
        const pm25=json.data.iaqi.pm25.v;
        AirPollution.innerText=`pm2.5 : ${pm25}     ${determine25(pm25)}\n      pm10  : ${pm10}     ${determine10(pm10)} `
        AirPollution.classList.add("pollutionSize");
        console.log(json);
    })
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&appid=${ApiKeyForForecast}`)
    .then(function(response){
        return response.json();
    }).then(function (json){
        const todayForecast=json.daily[0].weather[0].description;
        const tomorrowForecast=json.daily[1].weather[0].description;
        const theDayAfterTomorrowForecast=json.daily[2].weather[0].description;
        const icon=[]
        const iconLink=[]
        for(i=0; i<=2; i++){
            icon.push(json.daily[i].weather[0].icon)
            console.log(icon[i])
            iconLink.push(`http://openweathermap.org/img/wn/${icon[i]}@2x.png`)
        }
        console.log(json);   
        Weather.innerText= `Today :  ${todayForecast}   \n \n Tomorrow :  ${tomorrowForecast}   \n \n  TDAT :  ${theDayAfterTomorrowForecast}`
        WeIcon.innerHTML=`<img src=http://openweathermap.org/img/wn/${icon[0]}@2x.png height=52 width=42>`
        WeIcon2.innerHTML=`<img src=http://openweathermap.org/img/wn/${icon[1]}@2x.png height=60 width=50>`
        WeIcon3.innerHTML=`<img src=http://openweathermap.org/img/wn/${icon[2]}@2x.png height=60 width=50>`

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