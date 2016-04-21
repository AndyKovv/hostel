angular.module('OrderRoom')
	.controller('OrderInfoCtrl', ['$rootScope', '$scope', '$uibModalInstance', 'getOrderInfo',
	 function($rootScope, $scope, $uibModalInstance, getOrderInfo){

$scope.order_info = getOrderInfo;



}]);