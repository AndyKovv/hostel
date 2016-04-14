angular.module('dry').factory('dryAuth', [ '$rootScope','djangoAuth', function ($rootScope, djangoAuth) {
	return{
		userData: function(){

			djangoAuth.profile().then(function(data){
  			$rootScope.user = data;
            $rootScope.authenticated = true;
            });               
		},
		userClear: function(){
			delete $rootScope.user;
			$rootScope.authenticated = false;
		},
		authStatus: function(){
			djangoAuth.authenticationStatus(true).then(function(){
        		$rootScope.authenticated = true;
    		});
		},

		
	}
}]);