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
      weatherDataNew = new WeatherData();
      locationDataNew = new LocationData(weatherDataNew);
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
            "/assets/img/blu-blank.png"
         );
      });
   });

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
         // expect(request.directionsRenderer.setMap).toHaveBeenCalledTimes(1);
      });

      it("should create a valid directionsRequest object using generateDirectionsRequest()", () => {
         // spyOn(request, "generateDirectionsRequest").and.callThrough();
         expect(request.generateDirectionsRequest()).toEqual({
            origin: "Sydney NSW, Australia",
            destination: "Brisbane QLD, Australia",
            travelMode: "DRIVING",
            waypoints: [
               { location: "Bundaberg QLD 4670, Australia", stopover: false },
            ],
         });
      });

      it("should set map to null when removing markers", () => {
         // Arrange - Prepare our test
         spyOn(request.directionsRenderer, "setMap");
         // Act - Perform the test
         request.clearMap();
         // Assert - Check out result is what we expected
         expect(request.directionsRenderer.setMap).toHaveBeenCalledWith(null);
      });
   });

   it("My Second Test", () => {
      expect(true).toBe(true);
   });
});
