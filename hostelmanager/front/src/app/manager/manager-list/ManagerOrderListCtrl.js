'use strict';

angular.module('managerModule')
	.controller('ManagerOrderListCtrl', ['$rootScope', '$scope', '$interval', '$uibModal', 'managerOrders', 'ManagerService', 
		function($rootScope, $scope, $interval, $uibModal, managerOrders, ManagerService){
			$scope.list_orders = managerOrders;
			// Finish interval
			
			var interval;

			$scope.startTimer = function(){
			

			interval =  $interval(function(){
       			ManagerService.getManagerOrders().then( function (response) {
       				 $scope.list_orders = response;

       			});
       			$rootScope.authenticated ? interval : $interval.cancel(interval);
       				 }, 10000);
			}
			
			$scope.startTimer();
			 
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
				$scope.resetFilters = function(){
					$scope.filter = {
						number_order : '',
						person_info : '',
						date_in: '',
						date_out: '',

					}
					$scope.startTimer();
				}
				$scope.orderFilter = function(filter){
				
						ManagerService.filterOrder(filter).then(function(data){
							$scope.list_orders = data;
							if(angular.isDefined(interval)){
								$interval.cancel(interval);
							}
						});
					
				}
			
	}]);