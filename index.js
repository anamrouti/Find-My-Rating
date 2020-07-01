'use strict';

const STORE = {
    map : null,
    service : null,
    infowindow : null,

  }

const api_key = 'AIzaSyC-aN_OwNSOHHi068jAmbopsItbsZ6PWPE';
const searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

//Creates the format of the request URL based on the params
function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//var map;
//var service;
//var infowindow;

//initialize the map to selected location
function initialize() {
  var pyrmont = new google.maps.LatLng(0, 0);

  STORE.map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });
    

  var request = {
    query: $('#address').val() + ' ' + $('#city').val() 
  };
  STORE.infowindow = new google.maps.InfoWindow();
  STORE.service = new google.maps.places.PlacesService(STORE.map);
  STORE.service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    
    }
    STORE.map.setCenter(results[0].geometry.location);
  }
}

//creates markers for returned locations
function createMarker(place){
  var marker = new google.maps.Marker({
    map: STORE.map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    STORE.infowindow.setContent(place.name + ':' + place.formatted_address
    + '. rated ' + place.rating + ' by ' + place.user_ratings_total + ' customers !');
    STORE.infowindow.open(STORE.map, this);
  });
}

//creates request to OpenWeatherMap using corresponding city
function displayTemp(city){
 const myCity = $('#city').val();
  const weatherKey = 'acbcdb86a642e30e3a31fe2645a474ea';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${weatherKey}`)
  .then(response => {
      if(response.ok){
        return response.json()
      }
      throw new Error(response.statusText);
    })
  .then(responseJson => displayWeather(responseJson))
  .catch(error => alert('Something went wrong, please use a valid input and try again'));
}


function generateWeatherText(responseJson){
  return `<p>Here's what the weather looks like now in ${responseJson.name}:
  ${responseJson.weather[0]['main']} </p>
  <img src="http://openweathermap.org/img/wn/${responseJson.weather[0]['icon']}@2x.png" alt="weather icon"> `;
  
}
//displays results returned from OWM request
  function displayWeather(responseJson){
    $('#weather-text').empty();
    $('#weather-text').append(generateWeatherText(responseJson));
}


function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchQuery = $('#address').val();
        const key = api_key;
        initialize();
        displayTemp();
    });
}
$(watchForm);
