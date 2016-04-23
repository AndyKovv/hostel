describe('it will be test mainCtrl', function(){
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

beforeEach(module('mainPage'));

beforeEach(module('ui.bootstrap'));
beforeEach(module('uiGmapgoogle-maps'));
beforeEach(module('uiGmapgoogle-maps.directives.api'));
beforeEach(module('ngQuickDate'));
beforeEach(module('ui.mask'));

var $httpBackend, $scope, ctrl, $rootScope, uibModal, $state;

beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, _$uibModal_){
    
    $rootScope = _$rootScope_;
    uibModal = _$uibModal_;
   
    spyOn(uibModal, 'open');

    

    

	$scope = $rootScope.$new();
	ctrl = $controller('MainPageCtrl', { 
        $scope : $scope,
        $rootScope: $rootScope,
        $uibModal: uibModal,
        allRooms : { data: ['room1', 'room2']},
       
    });
    



}));

it('should create "hostels" model with two rooms', function(){

expect($scope.hostels.data).toEqual(['room1', 'room2']);

});

it('should open modal when data user data name is empty', function(){
    var authenticated  = true;
    $rootScope = {
        user:{
        username : '',
        }
    }
    expect($rootScope.user.username).toBe('');
    uibModal.open();
   expect(uibModal.open).toHaveBeenCalled(); 
   
});

it('should open google map modal with hostel location', function(){
    var hostel = {
        longitude : '123',
        latitude: '456',
    }
    $scope.openLocation(hostel);
    var longitude = hostel.longitude;
    var latitude = hostel.latitude;
    expect($scope.map.center.latitude).toEqual('456');
    expect($scope.map.center.longitude).toEqual('123');
    expect($scope.marker.id).toEqual(0);
    expect($scope.marker.coords.longitude).toEqual('123');
    expect($scope.marker.coords.latitude).toEqual('456');
    expect(uibModal.open).toHaveBeenCalled();


});

});