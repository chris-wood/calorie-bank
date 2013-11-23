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

app.controller('TreatController', ['$scope', '$calorie', '$log', function ($scope, $calorie, $log) {
  // $scope is a special object that makes
  // its properties available to the view as
  // variables. Here we set some default values:

  // Dummy data to start...
  $scope.treats = new Array();
  $scope.message = "YOU GET NOTHING!";

  // Some helper functions that will be
  // available in the angular declarations

  $scope.getTreats = function() {
    alert("fetching data!");
    $scope.treats = $calorie.getTreats("TODO");
    alert($scope.treats);
  } 
}]);

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

// function TreatController($scope, $http){

  
// }

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