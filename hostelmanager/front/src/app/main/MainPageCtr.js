 (function(){
 'use strict';
angular.module('mainPage')
  .controller('MainPageCtrl', [ '$rootScope','$scope', '$uibModal', '$timeout', 'allRooms',  'toastr',  
    function ($rootScope, $scope, $uibModal, $timeout, allRooms, toastr) {
    //resolve all room in app.js
    $scope.hostels = allRooms;
 // Chek user fully entered data   
 if($rootScope.authenticated){ 
    if($rootScope.user.user_firstname === ''){
      $timeout(function(){
        /*jshint expr:true */
        $rootScope.authenticated ? openModal() : '';
          }, 5000);
         }
       }
  // Open additional register form    
  function openModal(){
    $uibModal.open({
      templateUrl: 'registration-auth/registration/registration-userinfo-fields.tpl.html',
      controller: 'RegistrationCtrl',
         });
      
       }


$scope.openLocation = function(hostel){
  //Coords render to map
  var latitude = hostel.latitude;
  var longitude = hostel.longitude; 

 
$scope.map = {center: {latitude:latitude, longitude: longitude}, zoom: 16 };
 $scope.marker = {
      id: 0,
      coords: {
        latitude : latitude,
        longitude : longitude

      }
  };

  if(latitude && longitude){
  
  $uibModal.open({
      resolve: {
        map: function(){
          return $scope.map;
        },
        marker: function(){
          return $scope.marker;
        },
        render: function(){
          return $scope.render;
        }
      },
      templateUrl: 'main/show-map.tpl.html',
      controller: ['$scope', 'map', 'marker', 'render', function($scope, map, marker, render){
        $scope.render = true;
        $scope.map = map;
        $scope.marker = marker;
      }],
      size: 'md',

    });
 
 }
};
}]);

})();
