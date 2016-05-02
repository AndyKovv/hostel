(function(){
 'use strict';

angular.module('registrationAuth')
	.controller('PasswordResetCtrl', ['$scope', '$stateParams', '$uibModalInstance', '$timeout', 'djangoAuth', 'toastr',
										 function ($scope, $stateParams, $uibModalInstance, $timeout, djangoAuth, toastr) {
	
	$scope.pass_reset = false;

	$scope.passwReset = function(passwordResetForm){
		if(passwordResetForm.$valid){
			var data = {
				email : $scope.pw_reset.email,
			};

			djangoAuth.resetPassword(data).then(function(data){
				$scope.errors = data.error;
				
				$scope.pass_reset = data.error ? false : true;
			});

		}
	};

	$scope.passwConfirm = function(passwordConfimForm){
		if(passwordConfimForm.$valid){
			var success_message = 'Password change success';
			var data = {
			uid: $stateParams.firstToken,
			token : $stateParams.passwordResetToken,
			new_password1 : $scope.passw_confirm.passw1,
			new_password2 : $scope.passw_confirm.passw2
		};
			djangoAuth.confirmReset(data).then(function(data){
				$timeout(function(){toastr.success(success_message);}, 5000);
				$uibModalInstance.close();

			});

		}
	};



}]);

})();