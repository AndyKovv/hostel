(function(){
 'use strict';

angular.module('registrationAuth').controller('RegistrationCtrl', [ '$rootScope', '$scope', 'djangoAuth', 'dryAuth', '$uibModalInstance', 
	function($rootScope, $scope, djangoAuth, dryAuth, $uibModalInstance){

//Additional register form
$scope.additionalRegister = function(userInfoForm){

	if(userInfoForm.$valid){
	var	data={
			user_firstname : $scope.register.user_firstname,
			user_middlename: $scope.register.user_middlename,
			user_lastname: $scope.register.user_lastname,
			phone_number: $scope.register.phone_number
		};
		
		djangoAuth.updateProfile(data).then(function(){
				$uibModalInstance.close();
				//Update profile data
				dryAuth.userData();
		});
	}

};

$scope.mainRegister = function(registrationForm){
	
	$scope.errors = [];
	if(registrationForm.$valid){
	var data = {
			email : $scope.main_reg.email,
			password1 : $scope.main_reg.password1,
			password2 : $scope.main_reg.password2

		};
		
		djangoAuth.register(data).then(function(response){
			$scope.registration_success = true;
					
		}, function(data){
			$scope.errors = data.email;
		});
	}
};

$scope.close = function(){
	$uibModalInstance.close();
};

}]);

})();