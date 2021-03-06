/* This code is part taken from stack overflow to get the city name and zip code here:
http://stackoverflow.com/questions/30524576/geolocation-how-to-get-city-from-long-and-lat
I have edited for my use with zip code and updated with ES6 features
*/
$(document).ready(function(){
    insertCity = (cityState) => (document.getElementById('location').innerHTML = cityState);

    insertTemperature = (temperature) => (document.getElementById('temperature').innerHTML = "The temperature is " + temperature + " &#8457;");

    insertWeather = (weather) => (document.getElementById('weather').innerHTML = "The weather is: " + weather);

    getWeather = (userZip) => {
        let url = "https://api.wunderground.com/api/96d14ba5a9899887/conditions/q/" + userZip + ".json";
        $.getJSON(url, function(data) {
            let temperature = data.current_observation.temp_f;
            let weather = data.current_observation.weather;
            insertTemperature(temperature);
            insertWeather(weather);
        });
    }

    displayLocation = (latitude,longitude) => {
        const request = new XMLHttpRequest();

        const method = 'GET';
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        const async = true;

        request.open(method, url, async);
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200){
                const data = JSON.parse(request.responseText);
                let userZip = data.results[0].address_components[5].short_name;
                let cityState = data.results[0].address_components[1].long_name + ", " + data.results[0].address_components[3].long_name;
                insertCity(cityState);
                getWeather(userZip);
            }
        };
        request.send();
    };

    const successCallback = function(position) {
        const x = position.coords.latitude;
        const y = position.coords.longitude;
        displayLocation(x,y);
    };
    navigator.geolocation.getCurrentPosition(successCallback);
});
