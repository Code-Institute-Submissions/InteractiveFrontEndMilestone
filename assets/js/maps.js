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

/*creates new input type and sets its attributes then adds to route-form*/
//needs an if function to limit total destinations to 10.
//also needs an array of inputs AND to appear below startpoint
// function addWayPoint(){
//     var waypoint = document.createElement("INPUT");
//     waypoint.type = "text";
//     waypoint.classname = "col-7 form-control";
//     waypoint.id = "waypoint";
//     waypoint.name = "waypoint";
//     waypoint.placeholder = "Search Destination";
//     console.log("adadd");
//     document.getElementsByClassName("route-form")[0].appendChild(waypoint);
//     console.log("add");
// };

var waypoints = [document.getElementById("startpoint"), document.getElementById("endpoint")];
function addWayPoint(){
    var waypoint = document.createElement("INPUT");
    waypoint.type = "text";
    waypoint.classList.add("col-7");
    waypoint.classList.add("form-control");
    // waypoint.classList.add() = "col-7 form-control";
    waypoint.id = "waypoint";
    waypoint.name = "waypoint";
    waypoint.placeholder = "Search Destination";
    console.log("adadd");
    document.getElementsByClassName("route-form")[0].appendChild(waypoint);
    $("#waypoint").insertBefore("#endpoint");
    waypoints.splice(1,0,waypoint);
    console.log("add");
};


function deleteWayPoint(){

};


$(document).ready(() => {
    $("#waypointbtn").on('click', () => {
        addWayPoint();
    });
});