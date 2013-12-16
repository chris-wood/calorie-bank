///////////////////////////////////
/////// Application-wide classes
///////////////////////////////////

/**
 * A collection for a group of treats.
 */
function TreatGroup(groupName, treats) 
{
  this.groupName = groupName;
  this.treats = treats; // array of Treat objects
}

/**
 * A specific type of treat.
 */
function Treat(name, calories, location) 
{
  this.name = name;
  this.calories = calories;
  this.location = location;
}

/**
 * A location that specifies where treats (or their ingredients) can be found.
 */
function TreatLocation(name, address, url, latitude, longitude) 
{
  this.name = name;
  this.address = address;
  this.url = url;
  this.latitude = latitude;
  this.longitude = longitude;
}

/**
 * A class that encapsulates the parameters for the calorie gauge. This object is created
 * in response to some set of config. params sent from the server on page load.
 */
function CalorieGaugeConfig(min, max, target)
{
  this.min = min;
  this.max = max;
  this.target = target;
}

///////////////////////////////////
////// Angular scaffolding
///////////////////////////////////
// Create the calorie-bank app
var app = angular.module('calorie-bank', []);

// Create and inject the calorie-bank service into the ConversationController.
app.factory('$calorie', function ($http, $log) {
  // Store the service URLs locally here
  var indexUrl = '/';
  var treatsUrl = '/treats/';

  /** Publish the calorie service API **/
  return {
    /**
      * Retrieve a list of possible treats for the given username (server will handle authentication)
      *
      * @param convoId - target conversation to receive
      * @return map of conversation data
      */
    getTreats: function (username) {
      console.log(treatsUrl + username);
      $http({method: 'GET', url: treatsUrl + username}).
        success(function(data, status, headers, config) {
          return data;
        }).
        error(function(data, status, headers, config) {
         console.log("ERROR: unable to fetch treat information for this particular user.");
         return null;
        });
      // var paramstring = decodeURIComponent($.param(params));
      // return $http({method: 'GET', url: convoUrl + "?" + paramstring});
    }
  };
});

app.controller('MainController', ['$scope', '$calorie', '$log', function ($scope, $calorie, $log) {

  $scope.colors = new Array();
  // var white = '#' + 0x000;
  // var black = '#' + 0xFFF;
  $scope.colors[0] = "black";
  $scope.colors[1] = "white";
  var colorIndex = 0;

  // TODO
  $scope.updateTheme = function() {
    colorIndex = (colorIndex + 1) % 2;
    alert("Updating theme to: " + $scope.colors[colorIndex]);
  }

  $scope.getTheme = function() {
    return $scope.colors[$scope.colorIndex];
  }
}]);

app.controller('TreatController', ['$scope', '$calorie', '$log', function ($scope, $calorie, $log) {
  // Default objects in scope for this controller
  $scope.treatGroupCollection = new Array(); // this is an array of arrays
  $scope.message = "YOU GET NOTHING!";
  $scope.canExpand = false;

  /////// BEGIN TEST DATA
  $scope.treatGroupCollection = new Array();
  var t1 = new Treat("cookie", 200, null);
  var t2 = new Treat("brownie", 300, null);
  var t3 = new Treat("donut", 500, null);
  var tarray = new Array();
  tarray[0] = t1;
  tarray[1] = t2;
  tarray[2] = t3;
  $scope.treatGroupCollection[0] = new TreatGroup("Pastries", tarray);

  var f1 = new Treat("fries", 500, null);
  var f2 = new Treat("burger", 600, null);
  var farray = new Array();
  farray[0] = f1;
  farray[1] = f2;
  $scope.treatGroupCollection[1] = new TreatGroup("Fried Foods", farray);
  /////// END TEST DATA

  // TODO
  $scope.getTreats = function() {
    alert("fetching data!");
    $scope.treats = $calorie.getTreats("TODO");
    alert($scope.treats);
  } 

  // TODO
  $scope.renderTreat = function(treat) {
    alert("showing treat: " + treat.name);
    // TODO: render new image here? and update location controller with the treat's nearest location
  }
}]);

app.controller('CalorieBankController', ['$scope', '$calorie', '$log', function ($scope, $calorie, $log) {
  // Container for the gauges
  var gauges = [];

  // Parameters to fetch from the server?
  $scope.expandMessage = "Hide Me";
  $scope.expanded = true;
  $scope.currentCount = 1700;
  $scope.config = 
  {
    size: 400,
    label: "Calories",
    min: 0,
    max: 2400,
    target: 1800,
    minorTicks: 5,
    currentValue: $scope.currentCount
  };

  // Helper functions for the front-end to control what's displayed
  $scope.isCountUnder = function()
  {
    var per = $scope.config.max * 0.1;
    // console.log(($scope.currentCount < ($scope.config.target - per)));
    return ($scope.currentCount < ($scope.config.target - per));
  }

  $scope.isCountEven = function()
  {
    var per = $scope.config.max * 0.1;
    return ($scope.currentCount >= ($scope.config.target - per)) &&
     ($scope.currentCount <= ($scope.config.target + per));
  }

  $scope.isCountOver = function()
  {
    var per = $scope.config.max * 0.1;
    return ($scope.currentCount > ($scope.config.target + per)) ||
     ($scope.currentCount < ($scope.config.max - per)); 
  }

  $scope.expand = function()
  {
    $scope.expanded = !$scope.expanded;
    if ($scope.expanded) $scope.expandMessage = "Hide Me";
    else $scope.expandMessage = "Show Me More";
  }
  
  $scope.createGauge = function()
  {

    // TODO: pull configuration down from the backend through HTTP call
    // is a calorie configuration object warranted? backend can just build object when queried...
    
    var range = $scope.config.max - $scope.config.min;
    $scope.config.greenZones = [{ from: $scope.config.target - range*0.1, to: $scope.config.target + range*0.1 }];
    // config.yellowZones = [{ from: config.min, to: config.min + range*0.4 }];
    $scope.config.orangeZones = [{ from: $scope.config.target - range*0.25, to: $scope.config.target - range*0.1 }];
    $scope.config.redZones = [{ from: $scope.config.min + range*0.85, to: $scope.config.max }];
    
    gauges[name] = new Gauge("GaugeContainer", $scope.config);
    gauges[name].render();
  }
  
  $scope.createGauges = function()
  {
    $scope.createGauge();
  }
  
  $scope.updateGauges = function()
  {
    for (var key in gauges)
    {
      var value = $scope.getRandomValue(gauges[key])
      gauges[key].redraw(value);
    }
  }
  
  $scope.getRandomValue = function(gauge)
  {
    var overflow = 0; //10;
    return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow*2) *  Math.random();
  }

  $scope.initialize = function()
  {
    $scope.createGauges();
    // setInterval($scope.updateGauges, 5000);



    /// INITIALIZE THE CHARTS
    $('#calorie-graph').highcharts({
            title: {
                text: 'Calorie Expendature',
                x: -20 //center
            },
            xAxis: {
                categories: 
                [
                'Sun', 
                'Mon', 
                'Tue', 
                'Wed', 
                'Thu', 
                'Fri', 
                'Sat'
                ]
            },
            yAxis: {
                title: {
                    text: 'Calories Burned'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'right',
            //     verticalAlign: 'middle',
            //     borderWidth: 0
            // },

            // There will be 1 series
            series: [{
                showInLegend: false, 
                name: 'Calories',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2]
            }]
        });

      $('#activity-graph').highcharts({
            title: {
                text: 'Activity Breakdown',
                x: -20 //center
            },
            xAxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            yAxis: {
                title: {
                    text: 'Calories Burned'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },

            // There will be 1 series
            series: 
            [
              {
                showInLegend: true,
                name: 'Exercise',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2]
              },
              {
                showInLegend: true,
                name: 'Active Minutes',
                data: [1.0,1.0,1.0,1.0,1.0,1.0,1.0]
              }
            ]
        });
  }
}]);

// function MapController($scope, $http){
//   // TODO
// }

app.controller('MapController', ['$scope', '$calorie', '$log', function ($scope, $calorie, $log) {

}]);

// // Main jQuery shenanigans - on page load
// $("#accordion").accordion({
//    active: false,            
//    autoHeight: false,            
//    navigation: true,            
//    collapsible: true,
//    create: function(event, ui) { $("#accordion").show(); }
// });