'use strict';

angular.module('mainPage')
.controller('DetailPageCtrl', ['$rootScope', '$scope', '$timeout',  '$uibModalInstance', 'OrderRoomService', 'djangoAuth', 'getRoom', 
 function ($rootScope, $scope, $timeout, $uibModalInstance, OrderRoomService, djangoAuth, getRoom) {
 var authenticated = $rootScope.authenticated;

$scope.room = getRoom;


$scope.redirect_init_date_in = $rootScope.additional_date_in;
$scope.redirect_init_date_out = $rootScope.additional_date_out;

//Render GoogleMap
$scope.render = false;
//Rener Order Form
$scope.orderadd = false;
//Render additional form 
$scope.render_additional = false;


$scope.mapShow = function(){
	//Coords render to map
	var latitude = $scope.room.latitude;
	var longitude = $scope.room.longitude;	
$scope.render = true;
$scope.map = {center: {latitude:latitude, longitude: longitude}, zoom: 16 };
 $scope.marker = {
      id: 0,
      coords: {
      	latitude : latitude,
      	longitude : longitude

      }
  }
};

//Redirecting to chosen free room
$scope.redirectFreeRoom = function(){
	$timeout(function(){
		$uibModalInstance.close();
		}, 500);		
}

//Close modal
$scope.close = function(){
	$uibModalInstance.close();
	delete $rootScope.additional_date_in;
	delete $rootScope.additional_date_out;

	
}

//Show additional room form
$scope.showAdditionalRoom = function(){
		$scope.render_additional = true;
		//$scope.additionalrooms = $scope.additionalRoom;
		
		
		
}


//Show order room form
$scope.showOrderForm = function(){
$scope.orderadd = true;

};


$scope.freePlaceInRoom = function(date){

$scope.chekFreeStatus = function(data, status){
	$scope.status_place = data.free_place > 0 ? 'Free' : 'Occupied';
		if($scope.status_place === 'Occupied'){
			$scope.additionalrooms = data;

			

		}
	
};

var errormsg = function(data, status){
	console.log('errormsg');
};

// Chek if bouth date is enter
if(date.order_in && date.order_out){
	var order_in = angular.toJson(date.order_in).slice(1,11);
	var order_out = angular.toJson(date.order_out).slice(1,11);
	var today = angular.toJson(new Date()).slice(1,11);
		$rootScope.additional_date_in = order_in;
		$rootScope.additional_date_out = order_out;

		// Chek date order in must be less then order out 
		if(order_in >= today && order_in < order_out ){
		// Combine data to request	
		var data = {
			order_in: order_in,
			order_out: order_out,
			room_id: $scope.room.id
			}
			
			//Fire the request to api
			OrderRoomService.chekFreePlace(data)
 			.success($scope.chekFreeStatus)
 			.error(errormsg);
 		

		}else{
			$scope.status_place = 'Wrong';
		}
	}



}

}]);