(function(){
 'use strict';

angular.module('registrationAuth')
.controller('VerifyEmailCtrl', ['$scope', '$stateParams', '$timeout', '$state', 'toastr', 'djangoAuth', 
	function ($scope, $stateParams, $timeout, $state, toastr, djangoAuth){
	
	djangoAuth.verify($stateParams.emailVerificationToken).then(function(data){
		$state.go('mainpage');
		$timeout(function(){toastr.success('Email confirm');}, 4000);
	});

}]);

})();