describe('it will test roomdetailCtrl', function(){
 jasmine.clock().install();
 beforeEach(function(){
        jasmine.addMatchers({
            toEqualData: function(util, customEqualityTesters) { 
                return { 
                    compare: function(actual, expected) { 
                        return { 
                            pass: angular.equals(actual, expected)
                        };
                    } 
                };
            } 
        });
    });


beforeEach(module('hostelApp'));
beforeEach(module('mainPage'));
beforeEach(module('ui.router'));
beforeEach(module('OrderRoom'));
beforeEach(module('registrationAuth'));
beforeEach(module('uiGmapgoogle-maps'));
beforeEach(module('ngCookies'));
 
 
 var $scope, $httpBackend, router, ctrl, latitude, longitude, $rootScope;

  
  var date = {
        order_in :'2016-04-20',
        order_out : '2016-04-24',
                    
        }


var getRoomMock = {
    data: 'room1',
    latitude:'123',
     longitude:'234',
     id : 1,

}
 beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, _OrderRoomService_){

    
    $httpBackend = _$httpBackend_;
    OrderRoomService = _OrderRoomService_;
    spyOn(OrderRoomService, 'chekFreePlace').and.callThrough();
    $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
 	$rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();


    

    


 	$ctrl = $controller('DetailPageCtrl', {
        $rootScope : $rootScope,
        $scope: $scope,
        $uibModalInstance: $uibModalInstance,
        OrderRoomService : OrderRoomService,
        getRoom : getRoomMock,   
});
 	

 }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  

it('should fetch room detail', function(){

    expect($scope.room.data).toEqualData('room1');

});

it('should test render map function', function(){
    expect($scope.render).toBe(false);
    $scope.mapShow.apply();
    expect($scope.render).toBe(true);
})

it('should test mapShow function', function(){
      
    
    $scope.mapShow.apply();
    
    var latitude = $scope.room.latitude;
    var longitude = $scope.room.longitude;
    expect($scope.render).toBe(true);
    expect(latitude).toEqual('123');
    expect(longitude).toEqual('234');

})

it('should test close modal window function', function(){

    $scope.close.apply();
    expect($uibModalInstance.close).toHaveBeenCalled();
});

it('should test chekFreePlace free room ', function(){

 $scope.freePlaceInRoom(date);
 var data = {
        order_in: '2016-04-20',
        order_out: '2016-04-24',
        room_id: $scope.room.id,
        }
 $httpBackend.expectPOST('/api/orders/chek_room/', data).respond(200, {
    free_place: 1,
 });
 expect(OrderRoomService.chekFreePlace).toHaveBeenCalledWith(data);

 $httpBackend.flush();

expect($scope.status_place).toBe('Free');
expect($scope.additionalrooms).toBe(undefined);
});

it('should test chekFreePlace occupied room', function(){
$scope.freePlaceInRoom(date);
 var data = {
        order_in: '2016-04-20',
        order_out: '2016-04-24',
        room_id: $scope.room.id,
        }
expect($rootScope.additional_date_in).toEqual(data.order_in);
expect($rootScope.additional_date_out).toEqual(data.order_out);
$httpBackend.expectPOST('/api/orders/chek_room/', data).respond(200, {room: 1,});

$httpBackend.flush();
expect($scope.status_place).toBe('Occupied');
expect($scope.additionalrooms).toEqual({room:1});

});

it('it should test chekFreePlace server error', function(){
$scope.freePlaceInRoom(date);
 var data = {
        order_in: '2016-04-20',
        order_out: '2016-04-24',
        room_id: $scope.room.id,
        }
$httpBackend.expectPOST('/api/orders/chek_room/', data).respond(500);
$httpBackend.flush();
expect($scope.server_error).toBe(true);
});

it('should test freePlaceInRoom algoritm on client side', function(){
var order_in = date.order_in;
var order_out = date.order_out;
var mock_today = '2016-04-20';
expect(order_in).toEqual('2016-04-20');
expect(order_out).toEqual('2016-04-24');
expect(order_in >= mock_today && order_in < order_out).toBeTruthy();

$scope.$apply();
var order_in = '2016-04-19';
expect(order_in).toEqual('2016-04-19');
expect(mock_today).toEqual('2016-04-20');
expect(order_in >= mock_today && order_in < order_out).toBeFalsy();


});

});