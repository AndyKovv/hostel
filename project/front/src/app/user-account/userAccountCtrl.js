'use strict';
angular.module('userAccount')
  .controller('userAccountCtrl', ['$rootScope', '$scope', '$state', 'djangoAuth', 
    function ($rootScope, $scope, $state, djangoAuth) {
	
	$rootScope.authenticated ? '' : $state.go('mainpage');
	$scope.changePwForm = $rootScope.user.inner_reg ? true : false;

$scope.update = {
		first_name: $rootScope.user.user_firstname, 
		middle_name: $rootScope.user.user_middlename,
		last_name: $rootScope.user.user_lastname,
		phone_number : $rootScope.user.phone_number,
	}

$scope.updProfileData = function(profileForm){
	if(profileForm.$valid){
		var data = {
			user_firstname : $scope.update.first_name,
			user_middlename: $scope.update.middle_name,
			user_lastname: $scope.update.last_name,
			phone_number: $scope.update.phone_number,
		}
		console.log(data);
		djangoAuth.updateProfile(data).then(function(response){
			console.log('updProfileData success');			
		});
	}
}

$scope.upd = {old_password: '', new_passw1: '', new_passw2: ''}
$scope.changeUserPassword = function(changePassForm){

	if(changePassForm.$valid){
		var data = {
			old_password: $scope.upd.old_passw,
			new_password1: $scope.upd.new_passw1,
			new_password2: $scope.upd.new_passw2,
		}
		console.log(data);
		djangoAuth.changePassword(data).then(function(){
			console.log('changeUserPassword');
		}); 

	}

}



}]);
