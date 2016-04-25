describe('ManagerCtrl', function () {
	
	beforeEach(module('managerModule'));
	beforeEach(module('mainPage'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('registrationAuth'));
	beforeEach(module('uiGmapgoogle-maps'));
	beforeEach(module('ngCookies'));
 

	var getRoomMock = {
		id: '1',
		name: 'room1',


	}
	var  $scope, ctrl, $httpBackend, OrderRoomServiceMock;
	beforeEach(inject(function($compile, _$rootScope_, $controller, OrderRoomService, _$httpBackend_){
		$httpBackend = _$httpBackend_;
		$scope = _$rootScope_.$new();
		OrderRoomServiceMock = OrderRoomService;

		ctrl=$controller('ManagerCtrl', {
			$scope: $scope,
			OrderRoomService: OrderRoomServiceMock,
			getAllRooms: getRoomMock,
		})
	}));

	it('should show all room in main page view', function(){
		expect($scope.rooms).toEqual(getRoomMock);

	});

	it('should chek algoritm filter rooms form server', function(){
		var date = {
        order_in :'2016-10-20',
        order_out : '2016-10-24',
        today: '2016-10-20',
        }

        $scope.filterFreeRoom(date);
        expect(date.order_in >= date.today && date.order_in < date.order_out ).toBeTruthy();
        var data = {
        	order_in: date.order_in,
        	order_out: date.order_out,
        }
        
        $httpBackend.expectPOST('/api/orders/manager_filter/', data).respond(200, {room : '1'});
        $httpBackend.flush();
        //expect($scope.rooms).toEqual('room');

        $scope.$apply();
	})

})