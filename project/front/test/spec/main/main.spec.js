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

});