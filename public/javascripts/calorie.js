// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initialize() {
  var haightAshbury = new google.maps.LatLng(37.7699298, -122.4469157);
  var mapOptions = {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
  });
}

// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING // the ability to specify the type of route is here!
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

// dummy data for populating and putting a line on the map
var flightPlanCoordinates = [
  new google.maps.LatLng(37.772323, -122.214897),
  new google.maps.LatLng(21.291982, -157.821856),
  new google.maps.LatLng(-18.142599, 178.431),
  new google.maps.LatLng(-27.46758, 153.027892)
];
var flightPath = new google.maps.Polyline({
  path: flightPlanCoordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

flightPath.setMap(map);

// Add DOM listener - hook up event handlers above
google.maps.event.addDomListener(window, 'load', initialize);

/////// ANGULAR CONTROLLER STUFF BELOW

function GraphController($scope){

  // $scope is a special object that makes
  // its properties available to the view as
  // variables. Here we set some default values:

  $scope.showtooltip = false;
  $scope.value = 'Edit me.';

  // Some helper functions that will be
  // available in the angular declarations

  $scope.hideTooltip = function(){

    // When a model is changed, the view will be automatically
    // updated by by AngularJS. In this case it will hide the tooltip.

    $scope.showtooltip = false;
  }

  $scope.toggleTooltip = function(e){
    e.stopPropagation();
    $scope.showtooltip = !$scope.showtooltip;
  }
}

function CalorieBankController($scope){

  // $scope is a special object that makes
  // its properties available to the view as
  // variables. Here we set some default values:

  $scope.showtooltip = false;
  $scope.value = 'Edit me.';

  // Some helper functions that will be
  // available in the angular declarations

  $scope.hideTooltip = function(){

    // When a model is changed, the view will be automatically
    // updated by by AngularJS. In this case it will hide the tooltip.

    $scope.showtooltip = false;
  }

  $scope.toggleTooltip = function(e){
    e.stopPropagation();
    $scope.showtooltip = !$scope.showtooltip;
  }
}

function TreatController($scope, $http){

  // $scope is a special object that makes
  // its properties available to the view as
  // variables. Here we set some default values:

  // Dummy data to start...
  $scope.treats = new Array();
  $scope.treats[0] = "NOTHING!";

  // Some helper functions that will be
  // available in the angular declarations

  $scope.getTreats = function() {
    alert("fetching data!");
    $http({method: 'GET', url: '/treats/0'}).
      success(function(data, status, headers, config) {
        $scope.treats[0] = data;
      }).
      error(function(data, status, headers, config) {
       console.log("ERROR: unable to fetch treat information for this particular user.");
      });
  }
}

function MapController($scope, $http){

  // $scope is a special object that makes
  // its properties available to the view as
  // variables. Here we set some default values:

  $scope.showtooltip = false;
  $scope.value = 'Edit me.';

  // Some helper functions that will be
  // available in the angular declarations

  $scope.hideTooltip = function(){

    // When a model is changed, the view will be automatically
    // updated by by AngularJS. In this case it will hide the tooltip.

    $scope.showtooltip = false;
  }

  $scope.toggleTooltip = function(e){
    e.stopPropagation();
    $scope.showtooltip = !$scope.showtooltip;
  }
}