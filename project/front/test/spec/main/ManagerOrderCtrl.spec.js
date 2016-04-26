describe('ManagerOrderCtrl', function(){

	beforeEach(module('managerModule'));
	beforeEach(module('mainPage'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('registrationAuth'));
	beforeEach(module('uiGmapgoogle-maps'));
	beforeEach(module('ngCookies'));

	var $httpBackend, $scope, ctrl, OrderRoomServiceMok, $rootScope, $uibModalInstance;
	
	
	var date_in = '2016-10-20';
	var date_out = '2016-10-22';
	beforeEach(inject(function($compile, $controller, _$httpBackend_, OrderRoomService, _$rootScope_){
		$httpBackend = _$httpBackend_;
		$scope = _$rootScope_.$new();
		$rootScope = _$rootScope_;
		$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
		OrderRoomServiceMok = OrderRoomService;
		spyOn(OrderRoomServiceMok, 'orderRoom').and.callThrough();
			
		var order_form = angular.element(
			'<form name="managerOrderForm">' +
			'<input type="text" name="date_in" ng-model="m_order.date_in">' +
			'<input type="text" name="date_out" ng-model="m_order.date_out">' +
			'<input type="text" name="email" ng-model="m_order.email">' +
			'<input type="text" name="person_firstname" ng-model="m_order.person_firstname">'+
			'<input type="text" name="person_middlename" ng-model="m_order.person_middlename">'+
			'<input type="text" name="person_lastname" ng-model="m_order.person_lastname">'+
			'<input type="text" name="person_phonenumber" ng-model="m_order.person_phonenumber">'+
			'</form>'

		)
		
		$compile(order_form)($scope);
		managerOrderForm = $scope.managerOrderForm;
		$rootScope.user = {email : 'kov_andriy199@mail.ru'}
		$scope.m_order = {email: $rootScope.user.email, order_in: date_in, order_out: date_out}
		$scope.$apply();
		
		ctrl = $controller('ManagerOrderCtrl', {
			$rootScope: $rootScope,
			$scope: $scope,
			$uibModalInstance: $uibModalInstance,
			OrderRoomService: OrderRoomServiceMok,
			chosen_room: '1',
			price_room: '100',
			date_in: date_in,
			date_out: date_out,
		});
		
	}));

	it('should test enter data to ManagerOrderCtrl', function(){
		expect($scope.chosen_room_order).toEqual('1');
		expect($scope.amount_room).toEqual('100');
		
	});
	it('shoul test $scope.orderSendManager', function(){
		$scope.m_order = {
		 email: $rootScope.user.email,
		 order_in: date_in, 
		 order_out: date_out,
		 person_firstname: 'Andy',
		 person_middlename: 'Kov',
		 person_lastname: 'Olek',
		 person_phonenumber: '111111111111'
		}
		$scope.$digest();

		$scope.orderSendManager(managerOrderForm);
		expect(managerOrderForm.$valid).toBeTruthy();
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
		}
		$httpBackend.expectPOST('/api/orders/order_room/', data).respond(200, {id: '1'});
		expect(OrderRoomServiceMok.orderRoom).toHaveBeenCalledWith(data);
		$httpBackend.flush();
		expect($scope.order_success).toEqual(true);
		expect($uibModalInstance.close).toBeTruthy();
	});
});