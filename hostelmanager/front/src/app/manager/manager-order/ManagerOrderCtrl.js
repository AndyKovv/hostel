(function(){
	
 'use strict';

angular.module('managerModule')
	.controller('ManagerOrderCtrl', ['$rootScope', '$scope', '$filter', '$timeout', 'toastr', '$uibModalInstance', 'OrderRoomService', 'chosen_room', 'price_room', 'date_in', 'date_out', 
		function($rootScope, $scope, $filter, $timeout, toastr,  $uibModalInstance, OrderRoomService, chosen_room, price_room, date_in, date_out){
			$scope.chosen_room_order = chosen_room;
				$scope.amount_room = price_room;
				$scope.m_order= {
					email: $rootScope.user.email,
					order_in: date_in,
					order_out: date_out
				};

				$scope.orderSendManager = function(orderRoomManagerForm){
					
					var date_in = $filter('date')($scope.m_order.order_in, 'yyyy-MM-dd');
					var date_out = $filter('date')($scope.m_order.order_out, 'yyyy-MM-dd');
					if(orderRoomManagerForm.$valid){
						var data = {
							room : $scope.chosen_room_order,
        					person_email : $scope.m_order.email,
        					person_firstname : $scope.m_order.user_firstname,
        					person_middlename : $scope.m_order.user_middlename,
        					person_lastname: $scope.m_order.user_lastname,
        					person_phonenumber : $scope.m_order.phone_number,
        					date_in:  date_in,
        					date_out: date_out,
        					amount: $scope.amount_room,
						};
						OrderRoomService.orderRoom(data).then(function(data){
								$scope.order_success = data.id ? true : false;
								if($scope.order_success){
									$uibModalInstance.close();
									$timeout(function(){
										toastr.success('Замовлення прийнято');
									}, 5000);
								}else{
									toastr.success('Немає вільних місць');
								}
							});	
					}
				};

				$scope.close = function(){
					$uibModalInstance.close();
				};
}]);

})();