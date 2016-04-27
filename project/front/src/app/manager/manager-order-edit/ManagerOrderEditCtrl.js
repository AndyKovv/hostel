'use strict';

angular.module('managerModule')
	.controller('ManagerOrderEditCtrl', ['$rootScope', '$scope', 'order', '$timeout', 'toastr', '$uibModalInstance', 'ManagerService', 
		function($rootScope, $scope, order, $timeout, toastr, $uibModalInstance, ManagerService){
		$scope.order = order;

		$scope.addPayment = function(order){
			var pay_way = 'cash';
			var data = {
				id : order.id,
				amt: order.amount,
				pay_way: pay_way
			}
			ManagerService.managerPayment(data).then(function(data){
				$scope.success = 'ok';
				$uibModalInstance.close();
				$timeout(function(){
					toastr.success('Payment OK')
				}, 5000)

			});

		}


}]);