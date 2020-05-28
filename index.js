'use strict';

const api_key = 'AIzaSyC-aN_OwNSOHHi068jAmbopsItbsZ6PWPE';
const searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getLink(query, key, libraries){
    const params = {
        query: $('#address').val() ,
        key : api_key,
        libraries: "places",
        
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    fetch(url, {mode:'no-cors'})
    .then(response => {
        if (response.ok){
            return response.json();
        }
        //throw new error(response.statusText);
        (response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .then(responseJson => initMap(responseJson))
    
    
    
}


function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchQuery = $('#address').val();
        const key = api_key;
        //getLink(searchQuery, key);
        initialize();
    });
}
//var map;
//var service;
$(watchForm);

//function initMap(results){
    
    
//}

var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });
    console.log(map);
    console.log(document.getElementById('map'));

  var request = {
    location: pyrmont,
    radius: '500',
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      //createMarker(results[i]);
      console.log(place);
    }
  }
}
