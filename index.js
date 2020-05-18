'use strict';

const apiKey = ''
const searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

function formatQueryParams(params){
    const queryItems = object.keys(params)
        .map(key => '${encodedURIComponent(key)}=${encodeURIComponent(params[key])}')
    return queryItems.join('&');
}

function getLink(query, key){
    const params = {
        key : apiKey,
        q : query
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
            $('.results').removeClass('hidden');
        })
        .then(responseJson => console.log(JSON.stringify(responseJson)))
        .catch(err => {
            $('.results').append('alert(Search did not return any results.)');
        })
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchQuery = $('.location-input').val();
        const key = apiKey;
        getLink(searchQuery, key);
    });
}

$(watchForm);