
'use strict';

angular.module('registrationAuth')
  .controller('MasterCtrl', function ($scope, $location, $rootScope, djangoAuth) {
    // Assume user is not logged in until we hear otherwise
    $rootScope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function(){
        $rootScope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      $rootScope.authenticated = false;
      $rootScope.user = '';
    });
    // Wait and respond to the log in event.
    $rootScope.$on('djangoAuth.logged_in', function() {
      $rootScope.authenticated = true;
      djangoAuth.profile().then(function(data){
  		$rootScope.user = data;
  	});

    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection)
      $location.path('/restricted').replace();
    });
  });