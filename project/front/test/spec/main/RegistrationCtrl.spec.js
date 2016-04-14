describe('RegistrationCtrl', function(){

	beforeEach(module('registrationAuth'));
	beforeEach(module('dry'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('uiGmapgoogle-maps'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));


var $scope, ctrl, $httpBackend, djangoAuthService, $uibModalInstance, $rootScope, dryAuth;

beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, djangoAuth, $compile, _dryAuth_){
	$httpBackend = _$httpBackend_;
	djangoAuthService = djangoAuth;
	dryAuth = _dryAuth_;
	spyOn(djangoAuthService, 'updateProfile').and.callThrough();
	spyOn(djangoAuthService, 'register').and.callThrough();
	$scope = _$rootScope_.$new();
	
	$rootScope= _$rootScope_;

	$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

	ctrl = _$controller_('RegistrationCtrl', {	
		$rootScope : $rootScope,
		$scope : $scope,
		djangoAuth: djangoAuthService,
		dryAuth: dryAuth,
		$uibModalInstance: $uibModalInstance,
	});
 
 			var main_reg_form = angular.element(
 				'<form name="registrationForm">' +
 				'<input  type="email" ng-model="main_reg.email">' +
 				'<input type="text" ng-model="main_reg.password1">'+
 				'<input type="text" ng-model="main_reg.password2">'+
 				'</form>'  );

 			var additional_reg_form = angular.element(
 				'<form name="userInfoForm">'+
 				'<input type="text" ng-model="register.user_firstname">' +
 				'<input type="text" ng-model="register.user_middlename">' +
 				'<input type="text" ng-model="register.user_lastname">' +
 				'<input type="text" ng-model="register.phone_number">' +
 				'</form>'
 				); 
 			
 			$scope.register = {user_firstname: 'Andy', user_middlename: 'Kov', user_lastname: 'Olek', phone_number:'+38(067)340-1766'}
 			$scope.main_reg = {email: 'sndsadadadasd@gmail.com', password1: 'a4Fn2U4@', password2:'a4Fn2U4@'}
 			
 			$compile(main_reg_form)($scope);
 			$compile(additional_reg_form)($scope);

 			registrationForm = $scope.registrationForm;
 			userInfoForm = $scope.userInfoForm;
 			
 			$scope.data_main_register = {
				email :$scope.main_reg.email,
				password1 :$scope.main_reg.password1,
				password2 :$scope.main_reg.password2,
			}

			$scope.data_additional_register = {
				user_firstname: $scope.register.user_firstname,
				user_middlename: $scope.register.user_middlename,
				user_lastname: $scope.register.user_lastname,
				phone_number: $scope.register.phone_number,

			}		
	
}));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });


it('should test init ctrl', function(){

	expect(ctrl).toBeDefined();


});

it('should test additionalRegister function', function(){
	
	$scope.additionalRegister(userInfoForm);
	expect(userInfoForm.$valid).toBeTruthy();

		$httpBackend.expectPATCH('/api/user/', $scope.data_additional_register).respond(201);
		$httpBackend.expectGET('/api/user/').respond(200);
		$httpBackend.flush();

	expect($uibModalInstance.close).toBeTruthy();



});


it('should test mainRegister function', function(){
		
	$scope.mainRegister(registrationForm);
	expect(registrationForm.$valid).toBeTruthy();
	
		$httpBackend.expectPOST('/api/registration/', $scope.data_main_register).respond(200);
		
		expect(djangoAuthService.register).toHaveBeenCalledWith($scope.data_main_register);
		$httpBackend.flush();
		
});

it('should show email verifycation template when success register', function(){
	$scope.mainRegister(registrationForm);
	expect(registrationForm.$valid).toBeTruthy();
	$httpBackend.expectPOST('/api/registration/', $scope.data_main_register).respond(201);
	$httpBackend.flush();
	expect($scope.registration_success).toBeTruthy();
});

it('should chek email already registered', function(){
	$scope.mainRegister(registrationForm);
	$httpBackend.expectPOST('/api/registration/', $scope.data_main_register).respond(400, {email : 'A user is already registered with this e-mail address'});
	$httpBackend.flush();
	expect($scope.errors).toEqual('A user is already registered with this e-mail address');
});



});