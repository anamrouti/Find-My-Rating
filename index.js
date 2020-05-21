'use strict';

const api_key = 'AIzaSyC-aN_OwNSOHHi068jAmbopsItbsZ6PWPE';
const searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getLink(query, key){
    const params = {
        query: $("#location-input").val() + ' ' + $('#address').val() ,
        key : api_key,
        
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    fetch(url, {mode: "no-cors"})
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
    
    
    
}

function displayResults(responseJson){
   
    console.log(responseJson);

    
    
    initMap();

    $('#results').removeClass('hidden');
    
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchQuery = $('.location-input').val();
        const key = api_key;
        getLink(searchQuery, key);
        
    });
}

$(watchForm);

function initMap(){
    //const myLocation = $('.initial-location-js').val();
    //var myLatLng = new google.maps.LatLng();
    
    //var mapOptions = {
        //center: myLatLng,
        //zoom: 5
    //}
    
    //var map = new google.maps.Map(document.getElementById('map'), mapOptions) ;

    
    //}
    //marker.setMap(map);
}

    