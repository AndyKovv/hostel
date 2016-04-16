describe('userAccount:', function () {

	
	beforeEach(module('userAccount'));
	beforeEach(module('registrationAuth'));
	beforeEach(module('ui.router'));
	beforeEach(module('ngCookies'));




		var $scope, $rootScope, $state, ctrl,  $httpBackend, djangoAuthService, $uibModalInstance;
		
		beforeEach(inject(function(_$controller_, $compile, _$rootScope_, _$httpBackend_, _$state_, djangoAuth){

			$httpBackend = _$httpBackend_;
			$rootScope = _$rootScope_;
			$scope = _$rootScope_.$new();
			djangoAuthService = djangoAuth;
			$state = _$state_;
			spyOn(djangoAuthService, 'updateProfile').and.callThrough();
			spyOn(djangoAuthService, 'changePassword').and.callThrough();
			spyOn($state, 'go');
			$uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
			


			var element = angular.element(
				'<form name = profileForm>'+
				'	<input type="text" name="first_name" rus-eng-name ng-model="update.user_firstname">'+
				'		<input type="text" name="middle_name" rus-eng-name ng-model= "update.user_middlename">'+
				'			<input type="text" name="last_name" rus-eng-name ng-model="update.user_lastname">'+
				'				<input type="phone" name="phone" ng-model="update.phone_number">'+
				'</form>');
			var element2 = angular.element(
				'<form name="changePasswForm">'+
				'	<input type="password" name="old_passw" ng-model="pwupdate.old_passw">'+
				'			<input type="password" name="new_passw1" ng-model="pwupdate.new_passw1">'+
				'				<input type="password" name="new_passw2" ng-model="pwupdate.new_passw2" pw-match="upd.new_passw1">'+
				'</form>'
				);
			$compile(element)($scope);
			$compile(element2)($scope);
			profileForm = $scope.profileForm;
			changePasswForm = $scope.changePasswForm;
			$rootScope.user = {user_firstname: 'Andy', user_middlename: 'Kovalov', user_lastname: 'Oleks', phone_number: '1111111111111', inner_reg: 'true'}
			//$scope.up_passw = {old_passw: '', new_passw1:'', new_passw2:''}
			
			$rootScope.authenticated = true;

			ctrl = _$controller_('userAccountCtrl', {
				$scope : $scope,
				$rootScope : $rootScope,
				$state : $state,
				djangoAuth: djangoAuthService,
				$uibModalInstance: $uibModalInstance,

			});

			
			
			


		})); 

		it('should', function(){
			expect($rootScope.authenticated).toBeTruthy();

		});

		it('should update userprofile data', function(){
			expect($rootScope.authenticated).toBeTruthy;
			
			expect(profileForm.$dirty).toBeFalsy();
			profileForm.first_name.$setViewValue('Nasty');
			profileForm.middle_name.$setViewValue('NastyM');
			profileForm.last_name.$setViewValue('NastyN');
			
			$scope.$digest();
			expect(profileForm.$dirty).toBeTruthy();
			expect(profileForm.$valid).toBeTruthy();

			$scope.updProfileData(profileForm);
			var data = {
				user_firstname : $scope.update.user_firstname,
				user_middlename: $scope.update.user_middlename,
				user_lastname: $scope.update.user_lastname,
				phone_number: $scope.update.phone_number,

			}
			$httpBackend.expectPATCH('/api/user/', data).respond(201, {
				user_firstname : 'Nasty',
				user_middlename: 'NastyM',
				user_lastname: 'NastyN',
				phone_number: '1111111111111'
			});
			
			expect(djangoAuthService.updateProfile).toHaveBeenCalledWith(data);
			$httpBackend.flush();
			expect($rootScope.user).toEqual({
				user_firstname : 'Nasty',
				user_middlename: 'NastyM',
				user_lastname: 'NastyN',
				phone_number: '1111111111111'
			});
			expect($scope.update_success).toBe(true);
			

		});

		it('should change password', function(){
			expect($rootScope.authenticated).toBeTruthy();
			expect($rootScope.user.inner_reg).toBe('true');

			changePasswForm.old_passw.$setViewValue('111111');
			changePasswForm.new_passw1.$setViewValue('a4Fn2U4@');
			changePasswForm.new_passw2.$setViewValue('a4Fn2U4@');
			$scope.$apply();
			

			$scope.changeUserPassword(changePasswForm);
			expect(changePasswForm.$valid).toBeTruthy();
			var data = {
				old_password: $scope.pwupdate.old_passw,
				new_password1: $scope.pwupdate.new_passw1,
				new_password2: $scope.pwupdate.new_passw2,

			}
			$httpBackend.expectPOST('/api/password/change/', data).respond(201);
			expect(djangoAuthService.changePassword).toHaveBeenCalledWith(data);
			$httpBackend.expectPOST('/api/logout/').respond(200);
			$httpBackend.flush();
			expect($uibModalInstance.close).toHaveBeenCalled();
			expect($state.go).toHaveBeenCalledWith('mainpage');
			
		});
});