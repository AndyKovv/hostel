'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('mainPage')
  .controller('MainPageCtrl', [ '$rootScope','$scope',  '$uibModal', '$timeout', 'allRooms',  'toastr',  
    function ($rootScope, $scope,  $uibModal, $timeout, allRooms, toastr) {
    //resolve all room in app.js
    $scope.hostels = allRooms;
    
          
  if($rootScope.authenticated){ 
                if($rootScope.user.user_firstname === ''){
                 $timeout(function(){
                    $rootScope.authenticated ? openModal() : '';
                   }, 5000);
              }
             }

              function openModal(){
            $uibModal.open({
                 templateUrl: 'static/view/registration-auth/registration/registration-userinfo-fields.tpl.html',
                  controller: 'RegistrationCtrl',
             });
        
         }
  
   
  

  }]);
