'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('mainPage')
  .controller('MainPageCtrl', [ '$rootScope','$scope', '$uibModal', 'allRooms', function ($rootScope, $scope, $uibModal, allRooms) {
    $scope.hostels = allRooms;
        
    $scope.test =  'test';
   var authenticated = $rootScope.authenticated;
    if(authenticated === true){
    	var user = $rootScope.user;
    	if(user.user_firstname === ''){
    		 $uibModal.open({
           templateUrl: 'static/view/registration-auth/registration/registration-userinfo-fields.tpl.html',
              controller: 'RegistrationCtrl',


        })
    	
    	}
    }
   

  }]);
