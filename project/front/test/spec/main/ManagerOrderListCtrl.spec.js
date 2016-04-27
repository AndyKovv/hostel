describe('ManagerOrderListCtrl', function(){
	
	beforeEach(module('managerModule'));
	beforeEach(module('mainPage'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('ngCookies'));

	var $scope, ctrl;
	var getManagerOrdersMok =  {
		id: '1',
		order : '2'
	}
	var order = {
		id : '1',
	} 
	beforeEach(inject(function(_$rootScope_, $controller){
		$scope = _$rootScope_.$new();
		ctrl = $controller('ManagerOrderListCtrl', {
			$scope: $scope,
			getManagerOrders: getManagerOrdersMok,
		});
		$scope.$digest();

	}));

	it('should show list of managers orders', function(){
		expect($scope.list_orders).toEqual(getManagerOrdersMok);

	});
	it('should get payment form client $scope.managerPayment', function(){
		$scope.managerPayment(order);
	

	})
});