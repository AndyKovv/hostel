describe('OrderListCtrl', function () {
	
	beforeEach(module('OrderRoom'));
	beforeEach(module('ui.bootstrap'))
	beforeEach(module('ui.router'));
	beforeEach(module('ngCookies'));

	var getOrdersMock = [{
		id: '1',
		person_firstname : 'Andy',
		person_middlename : 'Kovalov',
		person_lastname:  'Oleksandrovich',
		date_in: '2016-04-12',
		date_out: '2016-04-15',
		payment: 'True',
		deselected: 'False',
	},{
		id: '1',
		person_firstname : 'Andy',
		person_middlename : 'Kovalov',
		person_lastname:  'Oleksandrovich',
		date_in: '2016-04-12',
		date_out: '2016-04-15',
		payment: 'True',
		deselected: 'False',
	}]

	var ctrl, $httpBackend, $scope, OrderRService, getOrdersMock, $uibModalInstance;
	beforeEach(inject(function($compile, _$controller_, OrderRoomService, _$httpBackend_,  _$rootScope_, _$stateParams_, _$state_){
		$httpBackend = _$httpBackend_;
		$scope = _$rootScope_.$new();
		OrderRService = OrderRoomService;
		$state = _$state_;
		spyOn($state, 'go');
		$stateParams = {orderInformationToken: '4eg3qojrwljoddvosymdbzsqp6s52dooycwwvscby6uayjblqsk8kghrp5gcjjnr'}
		$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
		var element_list = angular.element(
			'<form name="orderList">'+
			'<div ng-repeat="order in filteredOrders">'+
			'	<span>{{$index + 1}}</span>'+
			'		<span ng-bind="order.id"></span>'+
			'			<span ng-bind="order.person_firstname"></span>'+
			'					<span ng-bind="order.person_middlename"></span>'+
			'					<span ng-bind="order.person_lastname"></span>'+
			'				<span ng-bind="order.date_in"></span>'+
			'			<span ng-bind="order.date_out"></span>'+
			'		<span ng-bind="order.payment"></span>'+
			'	<span ng-bind="order.deselected"></span>'+
			'</div>'+
			'<uib-pagination ng-model="currentPage" total-items="orders.length" max-size="maxSize" boundary-links="true">'+
    		'</uib-pagination>'+
			'</form>'
			);
		//$scope.orders = getOrdersMock;
		var e = $compile(element_list)($scope)
		$scope.$digest();

		orderList = $scope.orderList
		ctrl = _$controller_('OrderListCtrl', {
			$scope : $scope,
			OrderRoomService : OrderRService,
			getOrdersList : getOrdersMock,
			$uibModalInstance : $uibModalInstance,
			$stateParams: $stateParams,
			$state : $state,

		});

	
	}));

	it('should put data to model', function(){
		expect($scope.orders).toBeDefined();
		expect($scope.orders).toEqual(getOrdersMock);
		expect($scope.filteredOrders).toBeDefined();
		expect($scope.currentPage).toBe(1);
		expect($scope.orders.length).toBe(2);
		});
	
	

});