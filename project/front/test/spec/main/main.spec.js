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

var $httpBackend, $scope, ctrl;
beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
	$httpBackend = _$httpBackend_;
	$httpBackend.expectGET('/api/rooms.json').respond([{room:'Room1'}, {room:'Room2'}]);

	$scope = $rootScope.$new();
	ctrl = $controller('MainPageCtrl', {$scope : $scope});



}));
it('shoul create "hostels" model with two rooms', function(){

expect($scope.hostels).toEqualData([]);
$httpBackend.flush();
expect($scope.hostels).toEqualData([{room:'Room1'}, {room:'Room2'}]);

});

});