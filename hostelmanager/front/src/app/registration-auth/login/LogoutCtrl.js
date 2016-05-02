(function(){
 'use strict';

angular.module('registrationAuth')
.controller('LogoutCtrl', ['$rootScope', '$scope', 'djangoAuth', '$location', function($rootScope, $scope, djangoAuth, $location){
     djangoAuth.logout();
     $rootScope.authenticated = 'false';
    }]);


})();