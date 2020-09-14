class locationView{
    constructor(locationData){
        this.locationData = locationData;
        this.location =location;
        this.dateTime = dateTime;
        this.id = id;
        initialise();
    }
    location;
    dateTime;
    id;

    initialise() {
        
        $(`<div id="${id}">
            <input type="text" class="col-7 form-control" id="${id}text" name="${id}text" placeholder="Search Destination">
            <input type="datetime-local" class="col-5" id="${id}date" name="${id}date">
        </div>`).appendTo(".route-form");
        autocomplete = new google.maps.places.Autocomplete(document.getElementById(id));
    }
}

class locationData{
    location;
    dateTime;
    state;
    id;
}

class wayPointsView{
    constructor(wayPointsData){
        
    }
    //either make array set lenght or add if statement for 10 or less waypoints
    waypointHtml = new array[10];
    
    addWayPoint(){
        waypointNew = new locationData();
        waypointNew.id = `waypoint${waypointHtml.lastIndexOf()}`
        wayPointsData.waypoints.push(waypointNew);
        waypointInput = new locationView(waypointNew);        
        this.waypointHtml.push(waypointInput);
    }

    removeWaypoint(waypointid){
        $(`#${waypointid}`).remove();
        wayPointsData.waypoints.splice(waypoints.find(waypointid),1);
        this.waypointHtml.splice(this.waypointHtml.find(waypointid),1);
    }
    
}

class wayPointsData{
    waypointsArray = [];
    origin = waypointsArray.find(id=="origin");
    destination = waypointsArray.find(id=="destination");
}

class directionsRequest{
    constructor(wayPointsData){
        this.origin = origin;
        this.destination = destination;
        const waypointsOnly = waypointsArray.splice()
        this.waypoints = waypointsOnly; //Need to decide on how to handle this
    }
  origin;
  destination;
  travelMode = `DRIVING`;
  //transitOptions;
  drivingOptions;
  unitSystem = UnitSystem.IMPERIAL;
  waypoints=[];
  optimizeWaypoints = true;
  provideRouteAlternatives = false;
  //need setting
  avoidFerries;
  avoidHighways;
  avoidTolls;
  region;
}

class directionsService{
    directions
}