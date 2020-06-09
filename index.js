'use strict';

const api_key = 'AIzaSyC-aN_OwNSOHHi068jAmbopsItbsZ6PWPE';
const searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
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



var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(0, 0);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });
    console.log(map);
    console.log(document.getElementById('map'));

  var request = {
    query: $('#address').val() + ' ' + $('#city').val() 
  };
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    
    }
    map.setCenter(results[0].geometry.location);
  }
}

function createMarker(place){
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name + ':' + place.formatted_address
    + '. rated ' + place.rating + ' by ' + place.user_ratings_total + ' customers !');
    infowindow.open(map, this);
  });
}

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
  .catch(error => 'something went wrong, please try again later');
}



  function displayWeather(responseJson){
    console.log(responseJson.weather);
    const unit = "imperial";
    $('#weather-text').text(`Here's what the weather looks like now in ${responseJson.name}:`);
}



