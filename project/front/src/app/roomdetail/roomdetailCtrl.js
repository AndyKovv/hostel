'use strict';

angular.module('mainPage')
.controller('DetailPageCtrl', ['$rootScope', '$scope', '$timeout',  '$uibModalInstance', 'OrderRoomService', 'djangoAuth', 'getRoom', 
 function ($rootScope, $scope, $timeout, $uibModalInstance, OrderRoomService, djangoAuth, getRoom) {
 var authenticated = $rootScope.authenticated;
 
$scope.room = getRoom;


//Send Date to redirect page
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
$scope.render_additional = false;

};


$scope.freePlaceInRoom = function(date){

// Chek if bouth date is enter
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
			room_id: $scope.room.id
			}
			
			//Fire the request to api
			OrderRoomService.chekFreePlace(data)
 			.then(function(response){
 						
 				$scope.status_place = response.data.free_place > 0 ? 'Free' : 'Occupied';
						if($scope.status_place === 'Occupied'){
								$rootScope.additional_date_in = order_in;
								$rootScope.additional_date_out = order_out;
								$scope.additionalrooms = response.data;
										}
											
 			},function(response){
 				$scope.server_error = true;
 				
 			});
 		

		}else{
			$scope.status_place = 'Wrong';
		}
	}
}


$rootScope.user = $rootScope.user ? $rootScope.user : '';
	$scope.user = {
				email : $rootScope.user.email,
        		user_firstname : $rootScope.user.user_firstname,
        		user_middlename :$rootScope.user.user_middlename,
        		user_lastname: $rootScope.user.user_lastname,
        		phone_number : $rootScope.user.phone_number,
}

$scope.orderRoom = function(orderForm){
	if(orderForm.$valid){
		
		var order_in = angular.toJson($scope.date.order_in).slice(1,11);
		var order_out = angular.toJson($scope.date.order_out).slice(1,11);
		var data = {
       			room : $scope.room.id,
        		person_email : $scope.user.email,
        		person_firstname : $scope.user.user_firstname,
        		person_middlename : $scope.user.user_middlename,
        		person_lastname: $scope.user.user_lastname,
        		person_phonenumber : $scope.user.phone_number,
        		date_in:  order_in,
        		date_out: order_out,
        		amount: $scope.room.price_room,

    }
    console.log('orderForm data'+ data);
    	OrderRoomService.orderRoom(data).then(function(data){
    		$scope.success_order = true;
    		console.log('DetailPageCtrl' + data);
    		$scope.orderadd = false;
    		$scope.order_ok = true;
    		$scope.order_confirm = data;
    	});

	}
}

}]);