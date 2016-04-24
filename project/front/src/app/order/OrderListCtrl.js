angular.module('OrderRoom')
	.controller('OrderListCtrl', ['$rootScope', '$scope', '$uibModalInstance', 'OrderRoomService', 'getOrdersList',
	 function($rootScope, $scope, $uibModalInstance, OrderRoomService, getOrdersList){

$scope.orders = getOrdersList;
console.log('RoomOrderCTRL' + $scope.orders);	
  
  $scope.filteredOrders = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 10;
  $scope.maxSize = 10;


  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    end = begin + $scope.numPerPage;
    if(angular.isArray($scope.orders) && $scope.orders.length > 0 ){
    $scope.filteredOrders = $scope.orders.slice(begin, end);
    }
  });
  
 $scope.close = function(){
$uibModalInstance.close();
}

}]);