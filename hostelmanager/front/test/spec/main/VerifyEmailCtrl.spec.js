describe('VerifyEmailCtrl', function () {

	beforeEach(module('registrationAuth'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('uiGmapgoogle-maps'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('toastr'));


    //  var emailVerificationToken = "adsdadasdwdffrfgdg53151114v84c11c15d1s86f4e";

		var $scope, ctrl, djangoAuthService, $httpBackend, toastr, $stateParams, $animate, emailVerificationToken, $state;

	beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, _djangoAuth_,
	 _toastr_, _$stateParams_, _$document_, _$animate_, _$state_){
		$httpBackend = _$httpBackend_;
		djangoAuthService = _djangoAuth_;
		
		$state = _$state_;
		$scope = _$rootScope_.$new();
		$rootScope = _$rootScope_;
		toastr = _toastr_;
		spyOn(djangoAuthService, 'verify').and.callThrough();
		spyOn($state, 'go');
		
		$stateParams = {emailVerificationToken: '4eg3qojrwljoddvosymdbzsqp6s52dooycwwvscby6uayjblqsk8kghrp5gcjjnr'};
		$document = _$document_;
		$animate = _$animate_;
		ctrl = _$controller_('VerifyEmailCtrl', {
			$scope : $scope,
			djangoAuth: djangoAuthService,
			toastr : toastr,
			$stateParams: $stateParams,
		});


	}));

it('should verify email adress', function(){
	
 	
	$httpBackend.expectPOST('/api/registration/verify-email/', {key: $stateParams.emailVerificationToken}).respond(201, { success: 'success register'});
	
	$httpBackend.flush();
	expect($state.go).toHaveBeenCalledWith('mainpage');
	
	
});
	


});