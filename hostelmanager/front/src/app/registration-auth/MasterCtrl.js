(function(){
 'use strict';

angular.module('registrationAuth')
  .controller('MasterCtrl',['$scope', '$location', '$rootScope', '$state', 'djangoAuth', 'dryAuth', 
    function ($scope, $location, $rootScope, $state, djangoAuth, dryAuth) {
     

    // Assume user is not logged in until we hear otherwise
    $rootScope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    dryAuth.authStatus();
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      dryAuth.userClear();

    });
    // Wait and respond to the log in event.
    $rootScope.$on('djangoAuth.logged_in', function(data) {
    dryAuth.userData();
    });
    //Wait and set user data after register
    $rootScope.$on('djangoAuth.register', function(){
    dryAuth.userData();
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.


$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams ) {
    if (!dryAuth.chekStatus()) {
      if (toState.param && toState.param.authenticated && toState.param.redirectTo) {
          $state.go(toState.param.redirectTo);
      }
    }else if(dryAuth.chekStatus()){
      if(toState.param && !toState.param.authenticated && toState.param.redirectTo){
        $state.go(toState.param.redirectTo);
      }
    }

  });
  }]);
  
})();