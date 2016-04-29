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

  


var getRoomMock = {
    data: 'room1',
    latitude:'123',
     longitude:'234',
     id : 1,

}
 beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, _OrderRoomService_, $compile){

    
    $httpBackend = _$httpBackend_;
    OrderRoomService = _OrderRoomService_;
    spyOn(OrderRoomService, 'chekFreePlace').and.callThrough();
    $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
 	$rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();

    var element_order = angular.element(
        '<form name= "orderForm">'+
        '<input type="text" name="date_arival" ng-model="date.order_in">'+
        '<input type="text" name="date_departure" ng-model="date.order_out">'+
        '<input type="text" name="phone_number" ng-model="user.phonenumber" required>'+
        '<input type="email"  name="email" ng-model="user.email" required>'+
        '<input type="text" rus-eng-name name="user_firstname" ng-model="user.user_firstname" required>'+
        '<input type="text" rus-eng-name name="user_middlename" ng-model="user.user_middlename" required>'+
        '<input type="text" rus-eng-name name="user_lastname" ng-model="user.user_lastname" required>'+
        '</form>'
        )
        $compile(element_order)($scope);
        orderForm = $scope.orderForm
        
       $scope.date = {order_in: '2016-04-19', order_out: '2016-04-20'}
       $scope.room = { id: '1', amount:'100'} 
       $rootScope.user = {id : '1'}
    


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

  
it('should write order to db anonim user', function(){
    expect($rootScope.user.id).toEqual('1');

    
    orderForm.phone_number.$setViewValue('1111111111111');

    orderForm.email.$setViewValue('kova_andriy@mail.com');
    orderForm.user_firstname.$setViewValue('Andriy');
    orderForm.user_middlename.$setViewValue('Oleksandr');
    orderForm.user_lastname.$setViewValue('Andy');
    
    $scope.$apply();
    

    $scope.orderRoom(orderForm);
    expect(orderForm.$valid).toBeTruthy();
    var order_in = angular.toJson($scope.date.order_in).slice(1,11);
        var order_out = angular.toJson($scope.date.order_out).slice(1,11); 

    var data = {
        room : $scope.room.id,
        
        person_email : $scope.user.email,
        person_firstname : $scope.user.user_firstname,
        person_middlename : $scope.user.user_middlename,
        person_lastname: $scope.user.user_lastname,
        person_phonenumber: $scope.user.phone_number,
        date_in: order_in,
        date_out: order_out,
        amount: $scope.room.amount,

    }

    $httpBackend.expectPOST('/api/orders/order_room/', data).respond('201', {data: 1});
    
    $httpBackend.flush();
    expect($scope.success_order).toEqual(true);
    expect($scope.orderadd).toEqual(false);
    expect($scope.order_ok).toEqual(true);
    expect($scope.order_confirm).toEqual('201');

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
  var date = {
        order_in :'2016-10-20',
        order_out : '2016-10-24',
                    
        }

 $scope.freePlaceInRoom(date);
 var data = {
        order_in: '2016-10-20',
        order_out: '2016-10-24',
        room_id: $scope.room.id,
        }
 $httpBackend.expectPOST('/api/orders/chek_room/', data).respond(200, {
    free_place: 1,
 });

 $httpBackend.flush();

expect(OrderRoomService.chekFreePlace).toHaveBeenCalledWith(data);
expect($scope.status_place).toBe('Free');
expect($scope.additionalrooms).toBe(undefined);
});

it('should test chekFreePlace occupied room', function(){
      var date = {
        order_in :'2016-10-20',
        order_out : '2016-10-24',

                    
        }

$scope.freePlaceInRoom(date);
 var data = {
        order_in: '2016-10-20',
        order_out: '2016-10-24',
        room_id: $scope.room.id,
        }

$httpBackend.expectPOST('/api/orders/chek_room/', data).respond(200, {room: 1,});

$httpBackend.flush();
expect($scope.status_place).toBe('Occupied');
expect($scope.additionalrooms).toEqual({room:1});
expect($rootScope.additional_date_in).toEqual(data.order_in);
expect($rootScope.additional_date_out).toEqual(data.order_out);

});

it('it should test chekFreePlace server error', function(){
      var date = {
        order_in :'2016-10-20',
        order_out : '2016-10-24',
                    
        }

$scope.freePlaceInRoom(date);
 var data = {
        order_in: '2016-10-20',
        order_out: '2016-10-24',
        room_id: $scope.room.id,
        }
$httpBackend.expectPOST('/api/orders/chek_room/', data).respond(500);
$httpBackend.flush();
expect($scope.server_error).toBe(true);
});

it('should test freePlaceInRoom algoritm on client side', function(){
      var date = {
        order_in :'2016-10-20',
        order_out : '2016-10-24',
                    
        }

var order_in = date.order_in;
var order_out = date.order_out;
var mock_today = '2016-10-20';
expect(order_in).toEqual('2016-10-20');
expect(order_out).toEqual('2016-10-24');
expect(order_in >= mock_today && order_in < order_out).toBeTruthy();

$scope.$apply();
var order_in = '2016-10-19';
expect(order_in).toEqual('2016-10-19');
expect(mock_today).toEqual('2016-10-20');
expect(order_in >= mock_today && order_in < order_out).toBeFalsy();


});

it('should send order room request', function(){
    
});

});