(function(){
 'use strict';

angular.module('OrderRoom')
	.controller('OrderInfoCtrl', ['$rootScope', '$scope', '$uibModalInstance', 'OrderRoomService', 'getOrderInfo',
	 function($rootScope, $scope, $uibModalInstance, OrderRoomService,  getOrderInfo){

$scope.order_info = getOrderInfo;


$scope.genPdf = function(order_info){
	var data = {
		unique_href : order_info.unique_href,
	};

	OrderRoomService.createPdf(data).then(function(data){
		var file = new Blob([data], { type: 'application/pdf' });
            saveAs(file, 'Order' + order_info.id + '_' + order_info.person_firstname + '_' + order_info.person_lastname +'.pdf');
		});
};


$scope.close = function(){
	$uibModalInstance.close();
};

}]);

})();