'use strict';

angular.module('managerModule')
	.controller('ManagerCtrl', ['$rootScope', '$scope', 'getAllRooms', 'OrderRoomService', function($rootScope, $scope, getAllRooms, OrderRoomService){
		$scope.rooms = getAllRooms;

$scope.filterFreeRoom = function(date){
	if(date.order_in && date.order_out){
	var order_in = angular.toJson(date.order_in).slice(1,11);
	var order_out = angular.toJson(date.order_out).slice(1,11);
	var today = angular.toJson(new Date()).slice(1,11);
		
		
		// Chek date order in must be less then order out 
		if(order_in >= today && order_in < order_out ){
		// Combine data to request	
		var data = {
			order_in: order_in,
			order_out: order_out,
			}
			console.log('ManagerCtrl ' + data);
			//Fire the request to api
			OrderRoomService.chekFreePlaces(data)
 			.then(function(response){
 				$scope.rooms = response;		
			});
 		

		}else{
			$scope.status_place = 'Wrong';
		}
	}
}

}]);