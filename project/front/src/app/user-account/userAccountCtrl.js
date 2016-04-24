'use strict';

angular.module('userAccount')
  .controller('userAccountCtrl', ['$rootScope', '$scope', '$location', '$state', '$timeout', '$uibModalInstance', 'toastr', 'djangoAuth', 
    function ($rootScope, $scope, $location, $state, $timeout, $uibModalInstance, toastr,  djangoAuth) {
 	

$scope.changePwForm = $rootScope.user.inner_reg ? true : false;

$scope.update = {
		user_firstname: $rootScope.user.user_firstname, 
		user_middlename: $rootScope.user.user_middlename,
		user_lastname: $rootScope.user.user_lastname,
		phone_number : $rootScope.user.phone_number,
	}

$scope.updProfileData = function(profileForm){
	if(profileForm.$valid){
		var data = {
			user_firstname : $scope.update.user_firstname,
			user_middlename: $scope.update.user_middlename,
			user_lastname: $scope.update.user_lastname,
			phone_number: $scope.update.phone_number,
		}
		console.log(data);
		djangoAuth.updateProfile(data).then(function(response){
			$scope.update_success = true;
			profileForm.$pristine = true;
			$rootScope.user = response;
			console.log('updProfileData success');			
		});
	}
}

$scope.pwupdate = {old_passw: '', new_passw1: '', new_passw2: ''}
$scope.changeUserPassword = function(changePasswForm){

	if(changePasswForm.$valid){
		var data = {
			old_password: $scope.pwupdate.old_passw,
			new_password1: $scope.pwupdate.new_passw1,
			new_password2: $scope.pwupdate.new_passw2,
		}
		console.log(data);
		djangoAuth.changePassword(data).then(function(){
			djangoAuth.logout();
			$uibModalInstance.close();
			$state.go('mainpage');
			$timeout(function(){toastr.success('Password change success');}, 3000);
			console.log('changeUserPassword');
		}); 

	}

}

$scope.close = function(){
$uibModalInstance.close();
}

}]);
