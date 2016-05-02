(function(){
 'use strict';

angular.module('managerModule')
	.controller('ManagerCtrl', ['$rootScope', '$scope', 'toastr', '$uibModal', 'getAllRooms', 'OrderRoomService', 
		function($rootScope, $scope, toastr,  $uibModal, getAllRooms, OrderRoomService){
		$scope.rooms = getAllRooms;
		$scope.button_enable = false;
$scope.filterFreeRoom = function(date){
	if(date.order_in && date.order_out){
	var order_in = angular.toJson(date.order_in).slice(1,11);
	var order_out = angular.toJson(date.order_out).slice(1,11);
	var today = angular.toJson(new Date()).slice(1,11);
	
		
		// Chek date order in must be less then order out 
		if(order_in >= today && order_in < order_out ){
		$scope.button_enable = true;
		// Combine data to request	
		var data = {
			order_in: order_in,
			order_out: order_out,
			};
			
			//Fire the request to api
			OrderRoomService.chekFreePlaces(data)
 			.then(function(data){
 				$scope.rooms = data;
 					
			});
 		

		}else{
			toastr.error('Wrong interval');
		}
	}
};

$scope.orderRoomManager = function(room){
	if(room){
		$scope.chosen_room = room.id;
		$scope.room_amount = room.price_room;
		
		$uibModal.open({
			resolve: {
				chosen_room : function(){
					return $scope.chosen_room;
				},
				price_room : function(){
					return $scope.room_amount;
				},
				date_in:  function(){
					return $scope.date.order_in;
				},
				date_out: function(){
					return $scope.date.order_out;
				}
			},
			controller: 'ManagerOrderCtrl',
			templateUrl: 'manager/manager-order/manager-order-page.tpl.html',
			size: 'lg',
		});
	}
};
}]);

})();