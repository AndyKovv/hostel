describe('PasswordResetCtrl', function(){

	beforeEach(module('registrationAuth'));
	beforeEach(module('ui.router'));
	beforeEach(module('OrderRoom'));
	beforeEach(module('uiGmapgoogle-maps'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));

	var ctrl, $httpBackend, $stateParams, $scope, djangoAuthMok, $uibModalInstace;
	beforeEach(inject(function($controller, $compile,  _$httpBackend_, _$rootScope_,  djangoAuth){
		$httpBackend = _$httpBackend_;
		djangoAuthMok = djangoAuth;
		$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
		spyOn(djangoAuthMok, 'resetPassword').and.callThrough();
		spyOn(djangoAuthMok, 'confirmReset').and.callThrough();
		$scope = _$rootScope_.$new()
		$stateParams = {firstToken: 'sdadsadwdsadwdedffrdggfdfrd', passwordResetToken: 'dsafdsfdsfefrgtrgthygjyki'}

		var elem_passw_rest = angular.element(
			'<form name="passwordResetForm">'+
			'<input type="email" ng-model="pw_reset.email">'+
			'</form>');
		var elem_pssw_confirm = angular.element(
			'<form name="passwordConfimForm">'+
			'<input type="text" name="passw1" ng-model="passw_confirm.passw1">'+
			'<input type="text" name="passw2" ng-model="passw_confirm.passw2">'+
			'</form>');
		
		$scope.pw_reset = {email: 'andy.kovv@gmail.com'}
		$scope.passw_confirm = {passw1: 'a4Fn2U4@', passw2: 'a4Fn2U4@'}

		$compile(elem_passw_rest)($scope);
		$compile(elem_pssw_confirm)($scope);
		passwordResetForm = $scope.passwordResetForm;
		passwordConfimForm = $scope.passwordConfimForm;

		ctr = $controller('PasswordResetCtrl', {
			$scope: $scope,
			djangoAuth: djangoAuthMok,
			$stateParams: $stateParams,
			$uibModalInstance: $uibModalInstance,
		})


	}));

	it('should test resetPassword email_ok', function(){

		$scope.passwReset(passwordResetForm);
		expect(passwordResetForm.$valid).toBeTruthy();
		var data = {
			email: $scope.pw_reset.email,
		}
		$httpBackend.expectPOST('/api/password/reset/', data).respond(200, {error: 'error'});
		expect(djangoAuthMok.resetPassword).toHaveBeenCalledWith(data);
		$httpBackend.flush()
		expect($scope.pass_reset).toBe(false);
		expect($scope.errors).toEqual('error');
	});
	it('should test resetPassword email_false', function(){
		$scope.passwReset(passwordResetForm);
		expect(passwordResetForm.$valid).toBeTruthy();
		var data = {
			email: $scope.pw_reset.email,
		}
		$httpBackend.expectPOST('/api/password/reset/', data).respond(500);
		expect(djangoAuthMok.resetPassword).toHaveBeenCalledWith(data);
		$httpBackend.flush()
		
	});

	it('should test passwConfirm', function(){
		$scope.passwConfirm(passwordConfimForm);
		expect(passwordConfimForm.$valid).toBeTruthy();
		var data = {
			uid: $stateParams.firstToken,
			token : $stateParams.passwordResetToken,
			new_password1 : $scope.passw_confirm.passw1,
			new_password2 : $scope.passw_confirm.passw2,
		}

		$httpBackend.expectPOST('/api/password/reset/confirm/', data).respond(201);
		expect(djangoAuthMok.confirmReset).toHaveBeenCalledWith(data);
		$httpBackend.flush();
		expect($uibModalInstance.close).toBeTruthy();
		


	});





});