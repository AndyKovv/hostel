(function(){
 'use strict';

angular.module('registrationAuth')
.controller('LoginCtrl', ['$scope', '$state', 'djangoAuth', 'Validate', '$uibModalInstance', 
						function($scope, $state, djangoAuth, Validate, $uibModalInstance){

$scope.model = {'email':'', 'password':''};
$scope.login = function(formData){
	$scope.errors = [];
	
	if(!formData.$invalid){

		djangoAuth.login($scope.model.email, $scope.model.password)
		.then(function(data){
				$uibModalInstance.close();
		},
		function(data){
			$scope.errors = data;

		});
	}


};

$scope.close = function(){
	$uibModalInstance.close();
	
};

}]);

})();