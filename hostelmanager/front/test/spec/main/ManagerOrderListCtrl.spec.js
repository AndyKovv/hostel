describe('ManagerOrderListCtrl', function(){
	
	beforeEach(module('managerModule'));
	beforeEach(module('mainPage'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('ngCookies'));

	var $scope, ctrl, $httpBackend, ManagerService, $interval, interval;
	var getManagerOrdersMok =  {
		id: '1',
		order : '2'
	}
	var order = {
		id : '1',
	} 

	beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _ManagerService_, _$interval_){
		$httpBackend = _$httpBackend_;
		ManagerService = _ManagerService_;
		$scope = _$rootScope_.$new();
	
		$interval = _$interval_;
		spyOn(ManagerService, 'getManagerOrders').and.callThrough();


		ctrl = $controller('ManagerOrderListCtrl', {
			$scope: $scope,
			
			ManagerService: ManagerService,
			managerOrders: getManagerOrdersMok,
			$rootScope : {authenticated : false}
		});
		

		


	}));
	afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

	it('should show list of managers orders', function(){
		expect($scope.list_orders).toEqual(getManagerOrdersMok);

	});
	it('should get payment form client $scope.managerPayment', function(){
		$scope.managerPayment(order);
		$httpBackend.expectGET('static/view/manager/manager-order-edit/manager-order-edit-list.tpl.html').respond(200);
		$httpBackend.flush();
	});
	it('should test $scope.startTimer', function(){
		$httpBackend.expectGET('/api/manager/').respond(200);
		$scope.startTimer();
		$interval.flush(10000);
		$httpBackend.flush();
	});
	it('should test $scope.resetFilters', function(){
		$scope.resetFilters();
		expect($scope.filter.number_order).toEqual('');
		expect($scope.filter.person_info).toEqual('');
		expect($scope.filter.date_in).toEqual('');
		expect($scope.filter.date_out).toEqual('');
	});
	it('should test $scope.orderFilter', function(){
		var filter = {
			number_order: '10',
		}
		$scope.orderFilter(filter);
		$httpBackend.expectGET('/api/manager/?id=10', {"Accept":"application/json, text/plain, */*"}).respond(200);
		$httpBackend.flush();
	});		
});