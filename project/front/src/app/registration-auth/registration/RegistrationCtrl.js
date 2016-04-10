'use strict';

angular.module('registrationAuth').controller('RegistrationCtrl', [ '$rootScope', '$state', '$scope', 'djangoAuth', '$uibModalInstance', 
	function($rootScope, $state, $scope, djangoAuth, $uibModalInstance){

$scope.inner_register = false;

$scope.additionalRegister = function(userInfoForm){

	if(userInfoForm.$valid){
	var	data={
			user_firstname : $scope.register.user_firstname,
			user_middlename: $scope.register.user_middlename,
			user_lastname: $scope.register.user_lastname,
			phone_number: $scope.register.phone_number,
		}
		
		djangoAuth.updateProfile(data).then(function(){
				$uibModalInstance.close();
				djangoAuth.profile().then(function(data){
					$rootScope.user = data;
				});
		}),
		function(){
			
		}
	}

}

}]);