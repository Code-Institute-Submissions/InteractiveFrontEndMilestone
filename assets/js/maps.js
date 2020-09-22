/* global google */ // defines google as a global value for ESLint without effecting google's API code.
var map, infoWindow;
let routeData, formInputs;

// ESLint cannot see the callback for initMap in index.html so needs next time to stop Lint complaints.
// eslint-disable-next-line no-unused-vars
function initMap() {
   const directionsService = new google.maps.DirectionsService();
   const directionsRenderer = new google.maps.DirectionsRenderer();
   map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
   });
   directionsRenderer.setMap(map);

   $(`.btn`).click(function () {
      const newRoute = new DirectionsRequest(routeData);
      console.log(newRoute);
      calculateAndDisplayRoute(directionsService, directionsRenderer, newRoute);
   });
}

class DirectionsRequest {
   constructor(wayPointsData) {
      this.origin = wayPointsData.origin();
      this.destination = wayPointsData.destination();
      // this.waypoints = wayPointsData.waypts;
      this.travelMode = `DRIVING`;
      // // transitOptions;
      // this.drivingOptions=""
      // this.unitSystem = UnitSystem.IMPERIAL;
      // this.waypoints=[];
      // // this.optimizeWaypoints = true;
      // // this.provideRouteAlternatives = false;
      // // this.avoidFerries="";
      // // this.avoidHighways="";
      // // this.avoidTolls="";
      // // this.region="";
   }
}

// Loads initial inputs for start/origin
$(document).ready(function () {
   routeData = new WayPointsData();
   formInputs = new HTMLInputs(routeData);
});

function calculateAndDisplayRoute(
   directionsService,
   directionsRenderer,
   directionsRequest
) {
   directionsService.route(directionsRequest, function (result, status) {
      if (status === "OK") {
         directionsRenderer.setDirections(result);
         console.log(result);
      } else {
         window.alert("Directions request failed due to " + status);
      }
   });
}

class WeatherRequest {
   constructor(wayPointsData) {
      this.openWeatherMapKey = "56d76261127ba6fda7f5aeed21fd5ffd";
      this.wayPointsData = wayPointsData;
      this.wayPointsData.locations.forEach((waypoint) => {
         // use of lat() lng() found in google maps documentation https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
         const lat = waypoint.location.geometry.location.lat();
         const lng = waypoint.location.geometry.location.lng();
         const weatherString =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lng +
            "&units=metric&appid=" +
            this.openWeatherMapKey +
            "";
         // Use of http request and passing to another class found in code institute interactive front end module and at
         // https://github.com/google/maps-for-work-samples/blob/master/samples/maps/OpenWeatherMapLayer/index.html
         const weatherRequest = new XMLHttpRequest();
         weatherRequest.open("get", weatherString);
         weatherRequest.send();
         weatherRequest.onload = () => {
            waypoint.weather = JSON.parse(weatherRequest.responseText);
            console.log(waypoint.weather);
            const formatter = new WeatherFormatter(
               weatherRequest.responseText,
               waypoint
            );
         };
      });
   }
}

$("#waypointbtn").click(function () {
   const weatherAPI = new WeatherRequest(routeData);
});

class WeatherData {
   constructor() {
      this.dateTime = "";
      this.weatherDescription = "";
      this.temperature = "";
      this.rain = "";
      this.clouds = "";
      this.wind = "";
      this.uvi = "";
      this.realFeel = "";
      this.humidity = "";
   }
}

// LocationData holds the individual input's location, date time and id values so they can be passed between the html view model and different api's without repeating.
class LocationData {
   constructor(weatherData) {
      this.location = "";
      this.dateTime = "";
      this.state = "";
      this.id = "";
      this.weatherData = weatherData;
   }
}

// LocationView holds properties matching locationData and a references to the input element in html and acts as a way to pass data between javascript storage and the view model.
// initialise() is called upon construction as this generates the html element which is referenced along with the auto complete associated with the specific element.
class LocationView {
   constructor(locationData) {
      this.locationData = locationData;
      this.initalise();
      this.marker = new google.maps.Marker({ map: map });
   }

   // Creates a new HTML input for text and date time using jquery then assigns the elements to a location and datetime variable for google autocomplete and generic value storage.
   initalise() {
      $(`<input type="text" class="col-7 form-control" id="${this.locationData.id}-input" name="${this.locationData.id}-input" placeholder="Search Destination">
       <input type="datetime-local" class="col-5 form-control" id="${this.locationData.id}-date" name="${this.locationData.id}-date">`).appendTo(
         ".route-form"
      );
      this.setUpdateAutocomplete();
      this.setUpdateDateTime();
   }

   setUpdateAutocomplete() {
      const location = new google.maps.places.Autocomplete(
         document.getElementById(`${this.locationData.id}-input`)
      );
      // Arrow function => used as it does not change the scope of this from the class. Found explanation at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      location.addListener(`place_changed`, () => {
         // gotten from google -> where?
         // if already one input, add location and zoom out?
         const place = location.getPlace();
         if (place.length === 0) {
            alert("Please select an appropriate Location");
         }
         this.addMarker(place, map);
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
         console.log(this.locationData);
      });
   }

   // assigns value of datetime-local to locationData property when input is changed.
   setUpdateDateTime() {
      const dateTime = document.getElementById(`${this.locationData.id}-date`);
      // => used instead of function as it does not change the scope of this from the class. Found explanation at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      $(dateTime).on(`change`, () => {
         // check if date is inserted and after current date. Converts to unix time stamp in seconds to compared to weather JSON.
         this.locationData.dateTime = dateTime.valueAsNumber / 1000;
         console.log(this.locationData);
      });
   }

   // Takes property of constructed marker and sets new position.
   addMarker(latLng, map) {
      this.marker.setPosition(latLng.geometry.location);
   }
}

// WaypointData holds an array of locationData classes and all the subsequent information. Used to pass to apis in a group per form submission rather than individual instances.
class WayPointsData {
   constructor() {
      this.locations = [];
      // Properties are set using arrow functions so they can be called when needed and are availavle rather than when constructed. Reference: https://www.w3schools.com/js/js_arrow_function.asp
      // Find used to select for an array element found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      this.origin = () => {
         const startPoint = this.locations.find((location) => {
            return location.id === "origin";
         });
         return startPoint.location.formatted_address;
      };
      // this.destination = () => {
      //    for (let d = 0; d < this.locations.length; d++) {
      //       if (this.locations[d][0].id === "destination") {
      //          return this.locations[d][0].location.formatted_address;
      //       }
      //    }
      // };
      this.destination = () => {
         const startPoint = this.locations.find((location) => {
            return location.id === "destination";
         });
         return startPoint.location.formatted_address;
      };
      // possibel use later { address:endPoint.location.formatted_address , latlng: endPoint.location.latlng }
   } // found filter at https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
   // this.waypts = this.locations.filter(function(element){return element.id !== "origin" || element.id !== "destination"});
}

class HTMLInputs {
   constructor(wayPointsData) {
      // Constructor is called once when page loads and is very similar to addWayPoint(), instead using a for loop to create two new elements and
      // changing the first element's Id to origin and the second to destination so they can be passed to directionRequest instance.
      for (let i = 0; i < 2; i++) {
         this.inputArray = [];
         this.newPageWeather = new WeatherData();
         this.newPageLocations = new LocationData(this.newPageWeather);
         wayPointsData.locations.push(this.newPageLocations);
         if (i === 0) {
            this.newPageLocations.id = `origin`;
         } else {
            this.newPageLocations.id = `destination`;
         }
         this.newPageInputs = new LocationView(this.newPageLocations);
         this.inputArray.push(this.newPageInputs);
      }
   }

   // addWayPoint function creates a new instance of LocationData which is passed as a parameter to a new instance of LocationView
   // The new LocationView instances create the required HTML and autocomplete instances for index.HTML which user interacts with.
   // The wayPointsData class and inputArray[] store locationData and LocationView respectively so they can be accessed and manipulated later.
   addWaypoint(wayPointsData) {
      const newWeatherData = new WeatherData();
      const newLocationData = new LocationData(newWeatherData);
      newLocationData.id = `waypoint${this.inputArray.length}`;
      wayPointsData.locations.push(newLocationData);
      const newWayPointHTML = new LocationView(newLocationData);
      this.inputArray.push(newWayPointHTML);
   }

   removeWayPoint() {}
}

class WeatherFormatter {
   constructor(weatherRequest, waypoint) {
      this.waypoint = waypoint;
      this.weatherData = waypoint.weatherData;
      this.weatherData.dateTime = "";
      this.twoDaysAway = () => {
         const today = new Date();
         today.setDate(today.getDate() + 2);
         const twoDays = Math.round(today.getTime() / 1000);
         return twoDays;
      };
      this.formatWeather(weatherRequest);
   }

   formatWeather(weatherRequest) {
      const results = JSON.parse(weatherRequest);
      const waypointTime = this.waypoint.dateTime;
      let timeframe;
      if (waypointTime === "") {
         timeframe = results.current;
      } else if (waypointTime > this.twoDaysAway()) {
         for (var t = 0; t < results.daily.length - 1; t++) {
            if (
               waypointTime > results.daily[t].dt &&
               waypointTime < results.daily[t + 1].dt
            ) {
               timeframe = results.daily[t];
               console.log(timeframe);
            }
         }
         console.log("for done");
         if (this.weatherData.dateTime === "") {
            timeframe = results.daily[results.daily.length - 1];
         }
      } else {
         for (var s = 0; s < results.hourly.length; s++) {
            if (
               waypointTime > results.hourly[s].dt &&
               waypointTime < results.hourly[s + 1].dt
            ) {
               timeframe = results.hourly[s];
               console.log(timeframe);
            }
         }
         if (this.weatherData.dateTime === "") {
            timeframe = results.hourly[results.hourly.length - 1];
         }
      }
      this.assignWeather(timeframe);
   }

   assignWeather(timeframe) {
      this.timeframe = timeframe;
      this.weatherData.dateTime = timeframe.dt;
      this.weatherData.weatherDescription = timeframe.weather;
      this.weatherData.temperature = timeframe.temp;
      this.weatherData.rain = timeframe.rain;
      this.weatherData.clouds = timeframe.clouds;
      this.weatherData.wind = timeframe.wind_speed;
      this.weatherData.uvi = timeframe.uvi;
      this.weatherData.realFeel = timeframe.feels_like;
      this.weatherData.humidity = timeframe.humidity;
   }
}

class LocationFormatter {
   constructor() {
      this.filler = "";
   }
}
