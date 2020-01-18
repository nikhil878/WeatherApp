console.log('Client side java script');

// fetch(
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1IjoibmlraGlsODc4IiwiYSI6ImNrNHFtdjY1bDNiMTAza3F4bWljNDAyZXQifQ.jEnCaxVBhhTJK1Irblp37Q'
// ).then(locData => {
//   locData.json().then(locDataParsed => {
//     if (locDataParsed.error) {
//       return console.log(locDataParsed.error);
//     }
//     console.log(locDataParsed.features[0].center[0]);
//     long = locDataParsed.features[0].center[0];
//     lat = locDataParsed.features[0].center[1];
//     console.log(locDataParsed.features[0].center[1]);
//   });
// });

const weatherForm = document.querySelector('form');
const searchLoc = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', event => {
  // we use preventDefault() in order to stop the default action (ie reloading of page when submit action is performed on form)
  event.preventDefault();
  message1.textContent = 'Loading...';
  message2.textContent = '';
  if (searchLoc.value === undefined) {
    return console.log('Please enter a location');
  }
  fetch('/weather?address=' + searchLoc.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        message1.textContent = data.error;
        return console.log(data.error);
      }
      console.log(data);
      message1.textContent = data.location;
      message2.textContent = data.forecast;
      console.log(data.location);
      console.log(data.forecast);
    });
  });
});
