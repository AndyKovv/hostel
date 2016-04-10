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
beforeEach(module('ngCookies'));
 
 
 var $scope, $httpBackend, router, ctrl, latitude, longitude, order_room,  stateProvider;


 room1Data = function(){
 	return {
 		room: 'firstRoom',
 		roomimages: ['image1.jpg'],
        latitude: '123',
        longitude: '234',
        id: '1',

 	};
 };
 
 
   

 beforeEach(inject(function(_$httpBackend_, $rootScope, $stateParams, $controller, _getRoom_, _OrderRoomService_, _$stateProvider_, _$router_){
    


    $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
    
   stateProvider = _$stateProvider_;
   router = _$router_;
    order_room = _OrderRoomService_;
    
    spyOn(order_room, 'chekFreePlace').and.callThrough();
   
 	$httpBackend = _$httpBackend_;

    
 	$stateParams.roomId = 'room1';
 	$httpBackend.expectGET('/api/rooms/room1.json').respond(room1Data());

 	$scope = $rootScope.$new();

     

 	$ctrl = $controller('DetailPageCtrl', {

        $scope: $scope,
        
    $uibModalInstance: $uibModalInstance,
    OrderRoomService : order_room,
    

    
    
    
});
 	

 }));  

it('should fetch room detail', function(){

    expect($scope.room).toEqualData({});
    $httpBackend.flush();
    expect($scope.room).toEqualData(room1Data());

});

it('should test render map function', function(){
    expect($scope.render).toBe(false);
    $scope.mapShow.apply();
    expect($scope.render).toBe(true);
})

it('should test mapShow function', function(){
    $httpBackend.flush();
    
    expect($scope.room).toEqualData(room1Data());
    $scope.mapShow.apply();
    
    var latitude = $scope.room.latitude;
    var longitude = $scope.room.longitude;
    expect($scope.render).toBe(true);
    expect(latitude).toBe('123');
    expect(longitude).toBe('234');

})

it('should test close modal window function', function(){

    $scope.close.apply();
    expect($uibModalInstance.close).toBeTruthy();
});

it('should convert date freePlaceInRoom function', function(){
    $httpBackend.flush();
    expect($scope.room).toEqualData(room1Data());

    var date = {
        order_in :'2016-04-20',
        order_out : '2016-04-24',
                    
        }

    $scope.freePlaceInRoom(date);
   
    var order_in = date.order_in;
    var order_out =  date.order_out;
    var today = '2016-04-20'; 
  
    expect(order_in).toBe('2016-04-20');
    expect(order_out).toBe('2016-04-24');
  
    var data = {
        order_in: order_in,
        order_out: order_out,
        room_id: $scope.room.id,
        }
  
  expect(order_room.chekFreePlace).toHaveBeenCalledWith(data);

 
   
});



});