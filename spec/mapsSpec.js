/* eslint-disable no-eval */

describe("Maps Tests", () => {
   beforeEach(() => {
      request = new DirectionsHandler();
      const data = new WayPointsData();
      data.locations = [
         {
            location: {
               formatted_address: "Sydney NSW, Australia",
               geometry: {
                  location: { lat: -33.8688197, lng: 151.2092955 },
                  viewport: {
                     south: -34.118347,
                     west: 150.5209286,
                     north: -33.5781409,
                     east: 151.3430209,
                  },
               },
               place_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
               utc_offset: 660,
               vicinity: "Sydney",
               utc_offset_minutes: 660,
            },
            dateTime: "",
            googleLatLng: { lat: -33.8690094, lng: 151.2092614 },
            id: "origin",
            weatherData: {
               dateTime: 1602153493,
               weatherDescription: [
                  {
                     id: 800,
                     main: "Clear",
                     description: "clear sky",
                     icon: "01n",
                  },
               ],
               temperature: 21.68,
               rain: "N/A",
               clouds: 3,
               wind: 6.7,
               uvi: 6.92,
               realFeel: 15.81,
               humidity: 33,
            },
         },
         {
            location: {
               formatted_address: "Brisbane QLD, Australia",
               geometry: {
                  location: { lat: -27.4697707, lng: 153.0251235 },
                  viewport: {
                     south: -27.7674409,
                     west: 152.6685227,
                     north: -26.9968449,
                     east: 153.3178702,
                  },
               },
               utc_offset: 600,
               vicinity: "Brisbane",
               utc_offset_minutes: 600,
            },
            dateTime: 1602612000,
            googleLatLng: { lat: -27.469881, lng: 153.0254897 },
            id: "destination",
            weatherData: {
               dateTime: 1602550800,
               weatherDescription: [
                  {
                     id: 800,
                     main: "Clear",
                     description: "clear sky",
                     icon: "01d",
                  },
               ],
               temperature: 24.18,
               rain: "N/A",
               clouds: 5,
               wind: 4.99,
               uvi: 9.77,
               realFeel: 20.95,
               humidity: 43,
            },
         },
         {
            location: {
               formatted_address: "Bundaberg QLD 4670, Australia",
               geometry: {
                  location: { lat: -24.8660809, lng: 152.3488645 },
                  viewport: {
                     south: -24.9490849,
                     west: 152.233655,
                     north: -24.8238742,
                     east: 152.411698,
                  },
               },
               utc_offset: 600,
               vicinity: "Bundaberg",
               utc_offset_minutes: 600,
            },
            dateTime: 1602319020,
            googleLatLng: { lat: -24.866861, lng: 152.3509333 },
            id: "waypoint27",
            weatherData: {
               dateTime: 1602316800,
               weatherDescription: [
                  {
                     id: 800,
                     main: "Clear",
                     description: "clear sky",
                     icon: "01n",
                  },
               ],
               temperature: 21.51,
               rain: "N/A",
               clouds: 0,
               wind: 2.89,
               uvi: "N/A",
               realFeel: 22.07,
               humidity: 78,
            },
         },
      ];
      formInputs.wayPointsData = data;
      formInputs.inputArray[0].locationData.location = {
         formatted_address: "Sydney NSW, Australia",
         geometry: {
            location: { lat: -33.8688197, lng: 151.2092955 },
            viewport: {
               south: -34.118347,
               west: 150.5209286,
               north: -33.5781409,
               east: 151.3430209,
            },
         },
         place_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
         utc_offset: 660,
         vicinity: "Sydney",
         utc_offset_minutes: 660,
      };
      formInputs.inputArray[1].locationData.location = {
         formatted_address: "Brisbane QLD, Australia",
         geometry: {
            location: { lat: -27.4697707, lng: 153.0251235 },
            viewport: {
               south: -27.7674409,
               west: 152.6685227,
               north: -26.9968449,
               east: 153.3178702,
            },
         },
         utc_offset: 600,
         vicinity: "Brisbane",
         utc_offset_minutes: 600,
      };
      weatherDataNew = new WeatherData();
      locationDataNew = new LocationData(weatherDataNew);
      testSearchBars = document.getElementsByClassName("pac-target-input");
      dataTest = new WayPointsData();
      htmlTest = new HTMLInputs(dataTest);
   });

   afterEach(() => {
      // Use of remove suggested from https://api.jquery.com/detach/#detach-selector
      // Use of wildcard to find all waypoint ids https://api.jquery.com/attribute-contains-selector/
      $("div.inputs[id*='origin']").not(`:first`).remove();
      $("div.inputs[id*='destination']").not(`:last`).remove();
      $("div.inputs[id*='waypoint']").remove();
      $("div.inputs[id*='undefined']").remove();
      $("div.inputs[id*='test']").remove();

      console.log(testSearchBars);
   });

   describe("WeatherData class", () => {
      it("should construct weatherData class properties", () => {
         expect(weatherDataNew.dateTime).toBe(undefined);
         expect(weatherDataNew.weatherDescription).toBe(null);
         expect(weatherDataNew.temperature).toBe(undefined);
         expect(weatherDataNew.rain).toBe(undefined);
         expect(weatherDataNew.clouds).toBe(undefined);
         expect(weatherDataNew.wind).toBe(undefined);
         expect(weatherDataNew.uvi).toBe(undefined);
         expect(weatherDataNew.realFeel).toBe(undefined);
         expect(weatherDataNew.humidity).toBe(undefined);
      });
   });
   describe("LocationData Class", () => {
      it("should construct LocationData Class properties", () => {
         expect(locationDataNew.location).toBe(null);
         expect(locationDataNew.dateTime).toBe(undefined);
         expect(locationDataNew.googleLatLng).toBe(undefined);
         expect(locationDataNew.id).toBe(undefined);
         expect(locationDataNew.weatherData).toEqual(weatherDataNew);
      });
   });

   describe("LocationView Class and its methods", () => {
      it("should construct ids assigned to HTML and properties", () => {
         locationDataNew.id = "test";
         const locationViewNew = new LocationView(locationDataNew);
         expect(locationViewNew.locationData).toEqual(locationDataNew);
         expect(locationViewNew.htmlId).toBe("test-input");
         expect(locationViewNew.marker).toBeInstanceOf(google.maps.Marker);
         expect(locationViewNew.infoWindow).toBeInstanceOf(
            google.maps.InfoWindow
         );
         expect(locationViewNew.infoWindow.maxWidth).toBe(300);
         expect(locationViewNew.minDate).not.toBe(undefined);
         expect(locationViewNew.maxDate).not.toBe(undefined);
      });

      it("should add a marker by setting its properties and icon.", () => {
         const dublin = {
            lat: 53.3498053,
            lng: -6.2603097,
         };
         const dublinData = new LocationData();
         dublinData.location = {
            geometry: {
               location: { lat: 53.3498053, lng: -6.2603097 },
               viewport: {
                  south: 53.22343009999999,
                  west: -6.4474847,
                  north: 53.42521010000001,
                  east: -6.0439235,
               },
            },
         };
         const locationViewDublin = new LocationView(dublinData);
         spyOn(locationViewDublin.marker, "setPosition").and.callThrough();
         expect(locationViewDublin.marker.icon).toBe(undefined);
         locationViewDublin.addMarker(locationViewDublin.locationData.location);
         expect(locationViewDublin.marker.setPosition).toHaveBeenCalledTimes(1);
         expect(locationViewDublin.marker.getPosition().lat()).toEqual(
            dublin.lat
         );
         expect(locationViewDublin.marker.getPosition().lng()).toEqual(
            dublin.lng
         );
         expect(locationViewDublin.marker.icon).toBe(
            "../assets/img/blu-blank.png"
         );
      });

      it("should set Marker map to null when removeMarker() is called", () => {
         const locationViewNew = new LocationView(locationDataNew);
         spyOn(locationViewNew.marker, "setMap");
         locationViewNew.removeMarker();
         expect(locationViewNew.marker.setMap).toHaveBeenCalledWith(null);
      });

      it("should set the marker location when weatherMarker() is called", () => {
         const locationViewNew = new LocationView(locationDataNew);
         const latlng = formInputs.wayPointsData.locations[0].googleLatLng;
         const info = formInputs.wayPointsData.locations[0].weatherData;
         const icon = `../assets/img/${formInputs.wayPointsData.locations[0].weatherData.weatherDescription[0].icon}@2x.png`;
         spyOn(locationViewNew.marker, "setPosition").and.callThrough();
         spyOn(locationViewNew.marker, "setIcon").and.callThrough();
         expect(locationViewNew.marker.icon).toBe(undefined);
         expect(locationViewNew.marker.getPosition()).toEqual(undefined);
         locationViewNew.weatherMarker(latlng, icon, info);
         expect(locationViewNew.marker.icon).toBe("../assets/img/01n@2x.png");
         expect(locationViewNew.marker.getPosition().lat()).toEqual(
            -33.8690094
         );
         expect(locationViewNew.marker.getPosition().lng()).toEqual(
            151.2092614
         );
      });

      it("should correctly set the infoWindow.setContent()", () => {
         const locationViewNew = new LocationView(locationDataNew);
         const latlng = formInputs.wayPointsData.locations[0].googleLatLng;
         const info = formInputs.wayPointsData.locations[0].weatherData;
         const icon = `../assets/img/${formInputs.wayPointsData.locations[0].weatherData.weatherDescription[0].icon}@2x.png`;
         expect(locationViewNew.infoWindow.getContent()).toBe(undefined);
         spyOn(locationViewNew.infoWindow, "setContent").and.callThrough();
         locationViewNew.weatherMarker(latlng, icon, info);
         expect(locationViewNew.infoWindow.getContent()).not.toBe(undefined);
         expect(locationViewNew.infoWindow.setContent).toHaveBeenCalledTimes(1);
      });
   });

   describe("WayPointsData class", () => {
      it("should change travel mode when called", () => {
         expect(formInputs.wayPointsData.travelMode).toBe("DRIVING");
         // Specific term .click found at https://www.w3schools.com/jsref/met_html_click.asp
         $("#changemode-walk").click();
         expect(formInputs.wayPointsData.travelMode).toBe("WALKING");
      });

      it("should correctly call its property get assessors", () => {
         const wayptTestArray = [];
         const wayptTest = {
            location:
               formInputs.wayPointsData.locations[2].location.formatted_address,
            stopover: false,
         };
         wayptTestArray.push(wayptTest);
         expect(formInputs.wayPointsData.origin()).toBe(
            formInputs.wayPointsData.locations[0]
         );
         expect(formInputs.wayPointsData.destination()).toBe(
            formInputs.wayPointsData.locations[1]
         );
         expect(formInputs.wayPointsData.waypts()).toEqual(wayptTestArray);
      });
   });

   describe("HTMLInputs Class", () => {
      it("should construct new instances of locationdata and locationview", () => {
         expect(htmlTest.inputArray.length).toBe(2);
         expect(htmlTest.wayPointsData.locations.length).toBe(2);
         expect(htmlTest.wayPointsData.locations[0].id).toBe("origin");
         expect(htmlTest.wayPointsData.locations[1].id).toBe("destination");
      });

      it("should increase number of objects in input array and waypointsData", () => {
         htmlTest.addWayPoint();
         expect(htmlTest.inputArray.length).toBe(3);
         expect(htmlTest.wayPointsData.locations.length).toBe(3);
      });

      it("should not add more waypoints when inputArray > 10", () => {
         let i = 0;
         while (i < 10) {
            htmlTest.addWayPoint();
            i++;
         }
         expect(htmlTest.inputArray.length).toBe(10);
         expect(htmlTest.wayPointsData.locations.length).toBe(10);
      });
      it("should remove waypoints when removeWaypoint is called", () => {
         htmlTest.addWayPoint();
         const waypointToDelete = htmlTest.inputArray[2].locationData.id;
         htmlTest.removeWayPoint(waypointToDelete);
         expect(htmlTest.inputArray.length).toBe(2);
         expect(htmlTest.wayPointsData.locations.length).toBe(2);
      });
      it("should reset the values of each locationData", () => {
         formInputs.resetTrip();
         const locationObject = formInputs.wayPointsData.locations[0];
         expect(locationObject.dateTime).toBe(undefined);
         expect(locationObject.googleLatLng).toBe(undefined);
         expect(locationObject.location).toBe(null);
         expect(locationObject.id).not.toBe(undefined);

         for (const propName in locationObject.weatherData) {
            if (propName === "weatherDescription") {
               expect(locationObject.weatherData[propName]).toBe(null);
            } else {
               expect(locationObject.weatherData[propName]).toBe(undefined);
            }
         }
      });
   });

   describe("Weather Formatter Class", () => {});

   describe("DirectionsHandler Class", () => {
      it("should construct class properties upon new", () => {
         spyOn(request.directionsRenderer, "setMap");
         expect(request.directionsRenderer).toBeInstanceOf(
            google.maps.DirectionsRenderer
         );
         expect(request.directionsRenderer.suppressMarkers).toBe(true);
         expect(request.directionsService).toBeInstanceOf(
            google.maps.DirectionsService
         );
      });

      it("should create a valid directionsRequest object using generateDirectionsRequest()", () => {
         expect(request.generateDirectionsRequest()).toEqual({
            origin: "Sydney NSW, Australia",
            destination: "Brisbane QLD, Australia",
            travelMode: "DRIVING",
            waypoints: [
               { location: "Bundaberg QLD 4670, Australia", stopover: false },
            ],
         });
      });

      it("should set map to null when reset is called", () => {
         // Arrange - Prepare our test
         spyOn(request.directionsRenderer, "setMap");
         // Act - Perform the test
         request.clearMap();
         // Assert - Check out result is what we expected
         expect(request.directionsRenderer.setMap).toHaveBeenCalledWith(null);
      });

      it("should return an alert when nothing has been entered into a location input", () => {
         spyOn(window, "alert");
         request.routeValidation();
         expect(window.alert).toHaveBeenCalledWith(
            "Please ensure all search locations have been completed."
         );
      });

      it("should return an alert autocomplete result not selected", () => {
         testSearchBars[0].value = "Sydney";
         spyOn(window, "alert");
         request.routeValidation();
         expect(window.alert).toHaveBeenCalledWith(
            "Please select your destination from the dropdown list."
         );
         testSearchBars[0].value = "";
      });

      it("should set the directionsRender map when called successfully", () => {
         testSearchBars[0].value = "Sydney NSW, Australia";
         testSearchBars[1].value = "Brisbane QLD, Australia";
         console.log(testSearchBars);
         spyOn(request.directionsRenderer, "setMap");
         request.routeValidation();
         expect(request.directionsRenderer.setMap).toHaveBeenCalledTimes(1);
         for (let i = 0; i < testSearchBars.length; i++) {
            testSearchBars[i].value = "";
         }
      });

      // it("should call clearMap() when reset button is clicked", () => {
      //    const directionsHandler = new DirectionsHandler();
      //    spyOn(directionsHandler, "clearMap").and.callThrough();
      //    $(".reset-btn").trigger("click");
      //    expect(directionsHandler.clearMap).toHaveBeenCalledTimes(1);
      // });
   });

   it("My Second Test", () => {
      expect(true).toBe(true);
   });
});
