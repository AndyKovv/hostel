'use strict';

angular.module('managerModule')
	.controller('ManagerOrderEditCtrl', ['$rootScope', '$scope', 'order', '$timeout', 'toastr', '$uibModalInstance', 'ManagerService', 
		function($rootScope, $scope, order, $timeout, toastr, $uibModalInstance, ManagerService){
		$scope.order = order;

		$scope.addPayment = function(order){
			var pay_way = $scope.payment_type.pay_way;
			var data = {
				id : order.id,
				amt: order.amount,
				pay_way: pay_way
			}
			ManagerService.managerPayment(data).then(function(data){
				$uibModalInstance.close();
				$timeout(function(){
					toastr.success('Payment OK')
				}, 5000)

			});

		}

		$scope.orderDeselect = function(order){
			var deselected_reason = $scope.deselected_reason;
			var data = {
				id: order.id,
				deselected_reason: deselected_reason,
			}
			ManagerService.deselectedOrder(data).then(function(data){
				$uibModalInstance.close();
				$timeout(function(){
					data.success ? toastr.success(data.success) : toastr.error(data.error); 
			}, 2000);

			});
		}


}]);