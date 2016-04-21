describe('OrderInfoCtrl', function(){
	beforeEach(module('OrderRoom'));
	beforeEach(module('ui.bootstrap'))
	beforeEach(module('ui.router'));
	beforeEach(module('ngCookies'));

	var  ctrl, $httpBackend, $scope, $uibModalInstance;
	var getOrderInfoMock = {
		order : '1',

	}
	beforeEach(inject(function($controller, _$httpBackend_, _$rootScope_ ){
		$httpBackend = _$httpBackend_;
		$scope = _$rootScope_.$new();
		$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
		ctrl = $controller('OrderInfoCtrl', {
			$scope : $scope,
			getOrderInfo : getOrderInfoMock,
			$uibModalInstance: $uibModalInstance,

		});


	}));

	it('should test $scope.order_info', function(){
		$scope.$digest();
		expect($scope.order_info).toEqual(getOrderInfoMock);
	});

})

	