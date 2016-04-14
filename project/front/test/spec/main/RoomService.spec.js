
describe('it will test RoomService', function(){

beforeEach(module('mainPage'));
beforeEach(module('uiGmapgoogle-maps'));

var $httpBackend, $rootScope, Rooms;
beforeEach(inject(function(_$httpBackend_, _$rootScope_, _Rooms_){
	$httpBackend = _$httpBackend_;
	$rootScope = _$rootScope_;
	Rooms = _Rooms_;


}))

});