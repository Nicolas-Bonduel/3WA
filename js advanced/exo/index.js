
const APIKEY = 'ab945d04765d4a7fdd13c89835527ab5';
let lat;
let long;
let city;
let temp;

onload();

function onload() {

    lat = localStorage.getItem('owp_lat');
    long = localStorage.getItem('owp_long');
    city = localStorage.getItem('owp_city');

    if (!lat || !long || !city) {
        console.log('getting data..');
        if (! navigator.geolocation)
            console.log('err 1');
        else
            navigator.geolocation.getCurrentPosition(getPosition);
    }
    else {
        console.log('data retrieved from storage');
        console.log('lat: ' + lat);
        console.log('long: ' + long);
        console.log('city: ' + city);

        getTemperature(city);
    }

}



function getPosition(position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log("lat: " + lat);
    console.log("long: " + long);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`)
    .then((res) => res.json() )
    .then((data) => {
        city = data.name;
        console.log('city: ' + city);

        localStorage.setItem("owp_lat", lat);
        localStorage.setItem("owp_long", long);
        localStorage.setItem("owp_city", city);

        getTemperature(city);
    })
    .catch((res) => console.log("something went wrong ><"));

}

function getTemperature(city_name) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => { console.log(data)
            temp = data.main.temp - 273.15;
            console.log('temp: ' + temp);
        })
        .catch((res) => console.log('something else went wrong ><'))

}