'use strict';

angular.module('managerModule')
	.controller('ManagerOrderListCtrl', ['$rootScope', '$scope', '$uibModal', 'getManagerOrders', 
		function($rootScope, $scope, $uibModal, getManagerOrders){
			$scope.list_orders = getManagerOrders;
	
				$scope.managerPayment = function(order){
					
					$uibModal.open({
						resolve:{
							order : function(){
								return order;
							},
						},
						templateUrl: 'static/view/manager/manager-order-edit/manager-order-edit-list.tpl.html',
						controller: 'ManagerOrderEditCtrl',
						size: 'lg',

					});
	
			}
	}]);