let map;
let autocomplete

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  /*sets initial search zone for autocomplete, priotitizes local areas, can be set world wide or by ip*/
  defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
    options = { bounds:defaultBounds};
    
    /*sets the input elements for start and finish as the autocomplete search box*/
    var origin = document.getElementById(`startpoint`);
    var destination = document.getElementById(`endpoint`);

    /*create autocompleted objects foor start and endpoints*/
    autocompleteOrigin = new google.maps.places.Autocomplete(origin, options);
    autocompleteDestination = new google.maps.places.Autocomplete(destination, options);
}

/* sets start area for preference of searching for auto complete answers*/
var defaultBounds;
    alert("huh");
var options;
