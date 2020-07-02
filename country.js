'use strict';

function getDataFromApi(searchTerm) {
  const url = `https://restcountries.eu/rest/v2/name/${searchTerm}`
  //console.log(url);
  fetch(url)
  .then(response=> response.json())
  .then(responseJson => 
      displayData(responseJson)
  );


  function displayData(){
  $('.js-search-result').append(`<p>${responseJson.name}</p>`)
  }
  
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let searchTerm = $('.js-query').val();
    getDataFromApi(searchTerm);
  });
}