
describe('it will test RoomService', function(){

beforeEach(module('mainPage'));

var $httpBackend, $rootScope, Rooms;
beforeEach(inject(function(_$httpBackend_, _$rootScope_, _Rooms_){
	$httpBackend = _$httpBackend_;
	$rootScope = _$rootScope_;
	Rooms = _Rooms_;


}))

it('will send a request ', function(){
$httpBackend.expect('GET', '/api/rooms/').respond(200, 'success');




})
});