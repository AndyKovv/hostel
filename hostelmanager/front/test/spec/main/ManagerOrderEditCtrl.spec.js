describe('ManagerOrderEditCtrl', function(){


	beforeEach(module('managerModule'));
	beforeEach(module('mainPage'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('registrationAuth'));
	beforeEach(module('ngCookies'));

	var $scope, ctrl, $uibModalInstance, ManagerServiceMock, $httpBackend;
	var order = {
		id: '1',
		room: '2',
	}
	beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, ManagerService, $compile){
		$httpBackend = _$httpBackend_;
		ManagerServiceMock = ManagerService;
		$scope = _$rootScope_.$new();
		$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close','dismiss']);
		$scope.payment_type ={pay_way : 'cash'};

		ctrl = $controller('ManagerOrderEditCtrl', {
			$scope: $scope,
			$uibModalInstance: $uibModalInstance,
			ManagerService: ManagerServiceMock,
			order: order
		});
		$scope.$digest();
}));

it('should test $scope.order_edit', function(){
		expect($scope.order).toEqual(order);
	});
it('should test $scope.addPayment()', function(){
	$scope.addPayment(order);

	var pay_way = $scope.payment_type.pay_way;
	
	var data = {
		id: order.id,
		amt: order.amount,
		pay_way: pay_way,
	}
	$httpBackend.expectPOST('/api/manager/payment/', data).respond(201, {sucess: 'ok'});
	$httpBackend.flush();
	expect($uibModalInstance.close).toBeTruthy();

});

it('should test $scope.orderDeselect', function(){
	$scope.orderDeselect(order);
	var deselected_reason = $scope.deselected_reason;
	var data = {
		id : order.id,
		deselected_reason: deselected_reason,
	}
	$httpBackend.expectPOST('/api/manager/deselect_order/', data).respond(201, {success: "OK"})
	$httpBackend.flush()
	expect($uibModalInstance.close).toBeTruthy();
});
});