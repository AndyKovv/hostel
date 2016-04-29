describe('OrderInfoCtrl', function(){
	beforeEach(module('OrderRoom'));
	beforeEach(module('ui.bootstrap'))
	beforeEach(module('ui.router'));
	beforeEach(module('ngCookies'));

	var  ctrl, $httpBackend, $scope, $uibModalInstance, OrderRoomService;
	var getOrderInfoMock = {
		order : '1',
		'unique_href': 'sdasdasdxxccdfefds',

	}
	beforeEach(inject(function($controller, _$httpBackend_, _$rootScope_, _OrderRoomService_){
		$httpBackend = _$httpBackend_;
		$scope = _$rootScope_.$new();
		OrderRoomService = _OrderRoomService_;
		$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
		spyOn(OrderRoomService, 'createPdf').and.callThrough();
		ctrl = $controller('OrderInfoCtrl', {
			$scope : $scope,
			getOrderInfo : getOrderInfoMock,
			OrderRoomService: OrderRoomService,
			$uibModalInstance: $uibModalInstance,

		});


	}));

	it('should test $scope.order_info', function(){
		$scope.$digest();
		expect($scope.order_info).toEqual(getOrderInfoMock);
	});

	it('should generate pdf form', function(){
		$scope.genPdf($scope.order_info);
		var data = {
			unique_href : $scope.order_info.unique_href,
			}
		$httpBackend.expectPOST('/api/orders/pdfcreator/', data).respond('201');
		expect(OrderRoomService.createPdf).toHaveBeenCalledWith(data);
		$httpBackend.flush();

	});	
});

	