'use strict';

angular.module('managerModule')
	.controller('ManagerOrderListCtrl', ['$rootScope', '$scope', '$interval', '$uibModal', 'getManagerOrders', 'ManagerService', 
		function($rootScope, $scope, $interval, $uibModal, getManagerOrders, ManagerService){
			$scope.list_orders = getManagerOrders;
			// Finish interval
			 function startInterval(){ 
			var interval =  $interval(function(){
       				 var promise = ManagerService.getManagerOrders();
       				 promise.then( function (response) {
       				 $scope.list_orders = response;

       				});
       				 $rootScope.authenticated ? interval : $interval.cancel(interval);
       				}, 8000);
			 	}
			 	startInterval();
			 
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

				$scope.orderFilter = function(filter){
					if(filter.number_order === ''){
						startInterval();
					}
					ManagerService.filterOrder(filter).then(function(data){
						$scope.list_orders = data;
						$interval.cancel(interval);
					});
				}
			
	}]);