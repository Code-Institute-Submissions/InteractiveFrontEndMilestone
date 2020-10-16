/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* global google */ // defines google as a global value for ESLint without effecting google's API code.
var map;
let formInputs, directionsHandler;

// Loads initial inputs for start/origin
$(document).ready(function () {
   const routeData = new WayPointsData();
   formInputs = new HTMLInputs(routeData);
   directionsHandler = new DirectionsHandler();
});

// Calls Addwaypoint on button click
$("#waypointbtn").click(function () {
   formInputs.addWayPoint(formInputs.wayPointsData);
});

// Reset button clears trip data in form inputs and clears route from map.
$(".reset-btn").click(() => {
   formInputs.resetTrip();
   directionsHandler.clearMap();
});

// Validates route for completed fields and valid locations.
$(".route-btn").click(() => {
   directionsHandler.routeValidation();
});

// Checks fields entered and closes modal/reset values when form submitted.
$(".send-btn").click(() => {
   contactFormValidation();
});

// ESLint cannot see the callback for initMap in index.html so needs next line to stop Lint complaints.
// eslint-disable-next-line no-unused-vars
function initMap() {
   map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
   });
}

// Checks both input fields for empty strings and checkes email is valid style.
// If correct, submits message and opens new modal confirmining.
function contactFormValidation() {
   const emailField = document.getElementById("sender-email");
   const messageField = document.getElementById("message-text");
   const contactForm = document.getElementById("contactForm");
   if (
      emailField.value !== "" &&
      messageField.value !== "" &&
      emailField.checkValidity()
   ) {
      contactForm.submit();
      emailField.value = "";
      messageField.value = "";
      $(`#contactUsModal`).modal(`hide`);
      $(`#confirmationModal`).modal(`show`);
      return true;
   } else {
      return false;
   }
}

// DirectionsHandler class is a single instance which controls directions service
// and renderer which is passed a new directions request.
// Implemented as needed to be able to set or remove one map to same instance.
class DirectionsHandler {
   constructor() {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
         suppressMarkers: true,
         polylineOptions: { strokeColor: "#733049" },
      });
      this.directionsRenderer.setMap(map);
   }

   // Searches for start and end based on form id and rest are stored in array.
   generateDirectionsRequest() {
      const directionsRequest = {
         origin: formInputs.wayPointsData.origin().location.formatted_address,
         destination: formInputs.wayPointsData.destination().location
            .formatted_address,
         travelMode: formInputs.wayPointsData.travelMode,
         waypoints: formInputs.wayPointsData.waypts(),
      };
      return directionsRequest;
   }

   // Checks all inputs and searches for empty strings which won't get results.
   // Checks autocomplete is chosen by matching string to location info.
   // SetsMap and calls for weather data/route data if all correct.
   routeValidation() {
      const textInputs = document.getElementsByClassName("pac-target-input");
      for (let i = 0; i < textInputs.length; i++) {
         if (textInputs[i].value.length === 0) {
            return window.alert(
               "Please ensure all search locations have been completed."
            );
         }
         const storedAddress = formInputs.inputArray.find((locationView) => {
            return locationView.htmlId === textInputs[i].name;
         });
         if (
            textInputs[i].value !==
            storedAddress.locationData.location.formatted_address
         ) {
            return window.alert(
               "Please select your destination from the dropdown list."
            );
         }
      }
      this.directionsRenderer.setMap(map);
      // Weather request does a callback for calculateAndDisplayRoute() to ensure all weather data has been returned before trying to assign waypoints/weather icons.
      weatherRequest(formInputs.wayPointsData, () => {
         this.calculateAndDisplayRoute(
            this.directionsService,
            this.directionsRenderer,
            this.generateDirectionsRequest()
         );
      });
   }

   // Based on google's function, if status is OK then returns a result to map.
   // Uses legs data to update each waypoint icon to map-used latlng.
   calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      directionsRequest
   ) {
      directionsService.route(directionsRequest, function (result, status) {
         if (status === "OK") {
            directionsRenderer.setDirections(result);
            // Uses googlemaps legs to find the actual GPS lat lng used or the weather icons will not be placed correctly. Often on building far from travel end point/startpoint.
            const leg = result.routes[0].legs[0];
            formInputs.wayPointsData.origin().googleLatLng = leg.start_location;
            formInputs.wayPointsData.destination().googleLatLng =
               leg.end_location;
            for (let s = 0; s < formInputs.wayPointsData.waypts().length; s++) {
               formInputs.wayPointsData.locations[s + 2].googleLatLng =
                  leg.via_waypoints[s];
            }

            for (const input of formInputs.inputArray) {
               const icon = `assets/img/${input.locationData.weatherData.weatherDescription[0].icon}@2x.png`;
               const latLng = input.locationData.googleLatLng;
               const info = input.locationData.weatherData;
               input.weatherMarker(latLng, icon, info);
            }
         } else {
            window.alert("Unable to find a route for your directions request.");
         }
      });
   }

   clearMap() {
      this.directionsRenderer.setMap(null);
   }
}

// Uses google derived lat and lng values to create weather request string.
// On return of data from all waypoints (callbackCount), calls the calculateroute.
function weatherRequest(wayPointsData, callback) {
   const openWeatherMapKey = "56d76261127ba6fda7f5aeed21fd5ffd";
   let callbackCount = 1;
   wayPointsData.locations.forEach((waypoint) => {
      // use of lat() lng() found in google maps documentation https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
      const lat = waypoint.location.geometry.location.lat();
      const lng = waypoint.location.geometry.location.lng();
      const weatherString =
         "https://api.openweathermap.org/data/2.5/onecall?lat=" +
         lat +
         "&lon=" +
         lng +
         "&exclude-minutely&units=metric&appid=" +
         openWeatherMapKey +
         "";
      // Use of http request and passing to another class found in code institute interactive front end module and at
      // https://github.com/google/maps-for-work-samples/blob/master/samples/maps/OpenWeatherMapLayer/index.html
      const weatherRequest = new XMLHttpRequest();
      weatherRequest.open("get", weatherString);
      weatherRequest.send();
      weatherRequest.onload = () => {
         callbackCount += 1;
         formatWeather(weatherRequest.responseText, waypoint);
         if (callbackCount === wayPointsData.locations.length) callback();
      };
   });
}

// Holds weatherdata collected from weather request, linked to locationdata.
class WeatherData {
   constructor() {
      this.dateTime = undefined;
      this.weatherDescription = null;
      this.temperature = undefined;
      this.rain = undefined;
      this.clouds = undefined;
      this.wind = undefined;
      this.uvi = undefined;
      this.realFeel = undefined;
      this.humidity = undefined;
   }
}

// LocationData holds the individual location, datetime and id values so they
// can be passed between the htmlview model and api's without repeating.
class LocationData {
   constructor(weatherData) {
      this.location = null;
      this.dateTime = undefined;
      this.googleLatLng = undefined;
      this.id = undefined;
      this.weatherData = weatherData;
   }
}

// LocationView holds properties matching locationData and a references to the
// input element in html. Passes data between data storage and the view model.
// initialise() is called upon construction as this generates the html element
// along with the auto complete associated with the specific element.
class LocationView {
   constructor(locationData) {
      this.locationData = locationData;
      this.htmlId = `${this.locationData.id}-input`;
      this.minDate = undefined;
      this.maxDate = undefined;
      this.calculateTimeScope();
      this.initalise();
      this.marker = new google.maps.Marker();
      this.infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });
   }

   // Creates a new HTML input for text and date time using jquery then assigns
   // the elements to a location/datetime variable for google autocomplete data storage.
   initalise() {
      if (formInputs === undefined) {
         $(`<div class="row inputs" id="${this.locationData.id}-container">
               <input type="text" 
                  class="col-7 form-control" id="${this.locationData.id}-input"
                  name="${this.locationData.id}-input" 
                  placeholder="Search Destination" 
                  aria-label="Location search">
               <input type="datetime-local" class="col-4 form-control" 
                  id="${this.locationData.id}-date" 
                  name="${this.locationData.id}-date" 
                  max="${this.maxDate}"
                  min="${this.minDate}" 
                  aria-label="Date time picker">
            </div>`).insertBefore("#waypoint-container");
      } else {
         // Insert before method found on w3c website tutorial https://www.w3schools.com/jquery/html_insertbefore.asp
         //, selects this for waypoint inputs not origin or destination.
         $(`<div class="row inputs" id="${this.locationData.id}-container">
               <input type="text" 
                  class="col-7 form-control" 
                  id="${this.locationData.id}-input"
                  name="${this.locationData.id}-input" 
                  aria-label="Location Search" 
                  placeholder="Search Destination">
               <input type="datetime-local" 
                  class="col-4 form-control" 
                  id="${this.locationData.id}-date" 
                  name="${this.locationData.id}-date" 
                  max="${this.maxDate}" min="${this.minDate}" 
                  aria-label="Date time picker">
                  <a role="button" 
                     id="${this.locationData.id}" 
                     class="deleteButton col-1 form-control">
                        <i class="fas fa-times deleteIcon"></i>
                  </a>
          </div>`).insertBefore("#destination-container");
      }
      this.setUpdateAutocomplete();
      this.setUpdateDateTime();
   }

   // Calculates the current time and adds 7 days to account for openWeatherMap
   // furthest weather data available. Turns to correct string format and cuts unnecessary
   // values at end of string as found at https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string.
   // Use of toISOString found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString .
   calculateTimeScope() {
      const today = new Date();
      const minDate = today.toISOString();
      const minDateStr = minDate.substring(0, minDate.length - 8);
      const sevenDays = today.setDate(today.getDate() + 7);
      const maxDate = new Date(sevenDays).toISOString();
      const maxDateStr = maxDate.substring(0, maxDate.length - 8);
      this.minDate = minDateStr;
      this.maxDate = maxDateStr;
   }

   // Assigns autocomplete class to own input which updates locations/geometry.
   setUpdateAutocomplete() {
      const location = new google.maps.places.Autocomplete(
         document.getElementById(`${this.locationData.id}-input`)
      );
      // Arrow function => used as it does not change the scope of this from the class.
      // Found explanation at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      location.addListener(`place_changed`, () => {
         const place = location.getPlace();
         if (!place.place_id) {
            return alert(
               "Please select an appropriate location from dropdown list."
            );
         }
         this.addMarker(place, map);
         // Updates map viewport with one from location chosen.
         const bounds = new google.maps.LatLngBounds();
         if (!place.geometry) {
            return;
         } else if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
         } else {
            bounds.extend(place.geometry.viewport);
         }
         map.fitBounds(bounds);
         this.locationData.location = place;
         const searchInput = document.getElementById(this.htmlId);
         searchInput.value = this.locationData.location.formatted_address;
      });
   }

   // assigns value of datetime-local to locationData when input is changed.
   setUpdateDateTime() {
      const dateTime = document.getElementById(`${this.locationData.id}-date`);
      // => used instead of function as it does not change the scope of this.
      // Found explanation at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      $(dateTime).on(`change`, () => {
         // check if date is inserted and after current date.
         // Converts to unix time stamp in seconds to match to weather JSON.
         this.locationData.dateTime = dateTime.valueAsNumber / 1000;
      });
   }

   // Takes property of constructed marker and sets new position.
   addMarker(latLng) {
      this.marker.setPosition(latLng.geometry.location);
      // Use of assets instead of ../ or / found on stack overflow.
      // https://stackoverflow.com/questions/24254127/html-image-wont-display
      // needs to be bare to alllow it to find any file named assets.
      this.marker.setIcon("assets/img/marker.png");
      this.marker.setMap(map);
      google.maps.event.clearInstanceListeners(this.marker);
      this.infoWindow.close();
      // remove event listener found at https://developers.google.com/maps/documentation/javascript/reference/event#event.removeListener
      if (this.infoWindow.content === true) {
         this.marker.removeListener("click");
      }
   }

   removeMarker() {
      this.marker.setMap(null);
   }

   // Sets marker position and icon to match direction location
   // Changes icon to openweathermap api icons provided.
   // Also sets content for infor window and adds click listender.
   weatherMarker(latLng, icon, info) {
      this.marker.setPosition(latLng);
      this.marker.setIcon(icon);
      this.infoWindow.close();
      const contentString = `<div class="content container">
            <div class="row">
               <h3 class="col-12 description text-capitalize">${info.weatherDescription[0].description}</h3>
               <p class="col-6">Cloud cover: ${info.clouds}%</p>
               <p class="col-6">Rain: ${info.rain} mm</p>
               <p class="col-6">Wind: ${info.wind} m/s</p> 
               <p class="col-6">Real Feel: ${info.realFeel}&#8451;</p>
               <p class="col-6">UV Index: ${info.uvi}</p>
               <p class="col-6">Temperature: ${info.temperature}&#8451;</p>
            </div>
         </div>`;
      // &#8451; for degrees celsius found at https://www.w3schools.com/charsets/ref_utf_letterlike.asp
      this.infoWindow.setContent(contentString);
      this.marker.addListener("click", () => {
         this.infoWindow.open(map, this.marker);
      });
   }
}

// WaypointData holds an array of locationData classes and all the subsequent
// information. Passed to apis as one stored array which can be defined to points.
class WayPointsData {
   constructor() {
      this.locations = [];
      // Properties are set using arrow functions so they can be called when
      // needed and are available rather than when constructed.
      // Reference: https://www.w3schools.com/js/js_arrow_function.asp
      // Find used to select for an array element found at
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      this.origin = () => {
         const startPoint = this.locations.find((location) => {
            return location.id === "origin";
         });
         return startPoint;
      };

      this.destination = () => {
         const endPoint = this.locations.find((location) => {
            return location.id === "destination";
         });
         return endPoint;
      };
      // found filter at https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
      this.waypts = () => {
         const array1 = this.locations.filter((location) => {
            return location.id !== "destination" && location.id !== "origin";
         });
         // Use of map to find and pull values found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         const waypts2 = array1.map((value) => ({
            location: value.location.formatted_address,
            stopover: false,
         }));
         return waypts2;
      };
      this.travelMode = "DRIVING";
      this.travelModeListener("#changemode-walk", "WALKING");
      this.travelModeListener("#changemode-car", "DRIVING");
      this.travelModeListener("#changemode-transit", "TRANSIT");
      this.travelModeListener("#changemode-bike", "BICYCLING");
   }

   // Multiple istances of this listener so it can use the specific id and "mode"
   travelModeListener(id, mode) {
      $(id).on("click", () => {
         this.travelMode = mode;
      });
   }
}

// Toptier container for information. Has reference to data and HTML elements.
class HTMLInputs {
   constructor(wayPointsData) {
      // Constructor is called once when page loads and is very similar to
      // addWayPoint(), instead using a for loop to create two new elements.
      this.wayPointsData = wayPointsData;
      this.inputArray = [];
      this.originAndDestination();
   }

   // Generates two specific input views for origin and destination which
   // require unique Ids and do not have remove waypoint icons to setup listeners for.
   originAndDestination() {
      for (let i = 0; i < 2; i++) {
         const newPageWeather = new WeatherData();
         const newPageLocations = new LocationData(newPageWeather);
         this.wayPointsData.locations.push(newPageLocations);
         if (i === 0) {
            newPageLocations.id = `origin`;
         } else {
            newPageLocations.id = `destination`;
         }
         const newPageInputs = new LocationView(newPageLocations);
         this.inputArray.push(newPageInputs);
      }
   }

   // addWayPoint function creates a new instance of LocationData.
   // This is used for new instance of LocationView which makes HTML and autocomplete.
   // The wayPointsData class and inputArray[] store locationData and LocationView
   // if >= 10 input sets, then popover warns the user instead and none added.
   addWayPoint() {
      if (this.inputArray.length < 10) {
         // I is assigned to date in milliseconds to prevent identical ids.
         const number = new Date().getTime();
         const newWeatherData = new WeatherData();
         const newLocationData = new LocationData(newWeatherData);
         newLocationData.id = `waypoint${number}`;
         this.wayPointsData.locations.push(newLocationData);
         const newWayPointHTML = new LocationView(newLocationData);
         this.inputArray.push(newWayPointHTML);
         // Tutorial for basic layout found at https://www.w3schools.com/JSREF/met_element_addeventlistener.asp
         document
            .getElementById(newLocationData.id)
            .addEventListener("click", () => {
               this.removeWayPoint(newLocationData.id);
            });
      } else {
         $('[data-toggle="popover"]').popover(`show`);
      }
   }

   // removes all inputs linked to that id, splices out of both arrays.
   removeWayPoint(elementId) {
      // Using 'dispose` action for popover to prevent popover even when < 10 waypoints.
      // Actions found at https://mdbootstrap.com/docs/jquery/javascript/popovers/#options.
      $('[data-toggle="popover"]').popover(`dispose`);
      document.getElementById(`${elementId}-input`).remove();
      document.getElementById(`${elementId}-date`).remove();
      document.getElementById(`${elementId}`).remove();
      document.getElementById(`${elementId}-container`).remove();
      for (let d = 0; d < this.wayPointsData.locations.length; d++) {
         if (this.wayPointsData.locations[d].id === elementId) {
            this.wayPointsData.locations.splice(d, 1);
            break;
         }
      }
      for (let e = 0; e < this.inputArray.length; e++) {
         if (this.inputArray[e].locationData.id === elementId) {
            this.inputArray[e].marker.setMap(null);
            this.inputArray.splice(e, 1);
            break;
         }
      }
   }

   // Form reset function found at
   // https://www.w3schools.com/jsref/met_form_reset.asp#:~:text=The%20reset()%20method%20resets,method%20to%20submit%20the%20form.
   // Resets the form values and all stored data.
   resetTrip() {
      document.getElementById("trip-form").reset();
      this.wayPointsData.locations.forEach((element) => {
         element.dateTime = undefined;
         element.googleLatLng = undefined;
         element.location = null;
         element.weatherData.weatherDescription = null;
         element.weatherData.dateTime = undefined;
         element.weatherData.temperature = undefined;
         element.weatherData.rain = undefined;
         element.weatherData.clouds = undefined;
         element.weatherData.wind = undefined;
         element.weatherData.uvi = undefined;
         element.weatherData.realFeel = undefined;
         element.weatherData.humidity = undefined;
      });
      this.inputArray.forEach((locationView) => {
         locationView.removeMarker();
      });
   }
}

// uses measurement of date and time two days away to decide if should be
// hourly or daily data. If no time inserted it chooses current.
function formatWeather(weatherFile, waypoint) {
   const results = JSON.parse(weatherFile);
   const waypointTime = waypoint.dateTime;
   const twoDaysAway = () => {
      const today = new Date();
      today.setDate(today.getDate() + 2);
      const twoDays = Math.round(today.getTime() / 1000);
      return twoDays;
   };
   let timeframe;
   if (waypointTime === "") {
      timeframe = results.current;
   } else if (waypointTime > twoDaysAway()) {
      // checks data for i and next index above; if [i] is smaller and [i+1] is bigger,
      // takes [i] as closest forecast. Stops at length -1 as i+1 does not exist.
      for (var t = 0; t < results.daily.length - 1; t++) {
         if (
            waypointTime >= results.daily[t].dt &&
            waypointTime <= results.daily[t + 1].dt
         ) {
            timeframe = results.daily[t];
         }
      }
      // If data is somehow between boundary of daily and hourly slots then
      // data will stop early and assume last index as its forecast.
      if (timeframe === undefined) {
         timeframe = results.daily[results.daily.length - 1];
      }
   } else {
      for (var s = 0; s < results.hourly.length - 1; s++) {
         if (
            waypointTime >= results.hourly[s].dt &&
            waypointTime <= results.hourly[s + 1].dt
         ) {
            timeframe = results.hourly[s];
            break;
         }
      }
      if (timeframe === undefined) {
         timeframe = results.hourly[results.hourly.length - 1];
      }
   }
   assignWeather(timeframe, waypoint);
}

// Assigns all values properties to the relevant time frame and its data.
// Math.round function found at https://www.w3schools.com/jsref/jsref_round.asp
function assignWeather(timeframe, waypoint) {
   const weatherData = waypoint.weatherData;
   weatherData.dateTime = timeframe.dt;
   weatherData.weatherDescription = timeframe.weather;
   if (typeof timeframe.temp === "object") {
      weatherData.temperature = Math.round(timeframe.temp.day);
   } else {
      weatherData.temperature = Math.round(timeframe.temp);
   }
   if (typeof timeframe.feels_like === "object") {
      weatherData.realFeel = Math.round(timeframe.feels_like.day);
   } else {
      weatherData.realFeel = Math.round(timeframe.feels_like);
   }
   weatherData.rain = timeframe.rain;
   if (typeof timeframe.rain === "object") {
      weatherData.rain = timeframe.rain["1h"];
   } else {
      weatherData.rain = timeframe.rain;
   }
   weatherData.clouds = timeframe.clouds;
   weatherData.wind = Math.round(timeframe.wind_speed);
   weatherData.uvi = timeframe.uvi;
   weatherData.humidity = timeframe.humidity;
   for (const property in weatherData) {
      if (weatherData[property] === undefined) {
         weatherData[property] = "N/A";
      }
   }
}
