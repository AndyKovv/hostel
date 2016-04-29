describe('directive-hostel test', function () {
	
	beforeEach(module('directive-hostel'));
	beforeEach(module('hostelApp'));


	describe('buttonEmail', function(){

	var form, $scope, $location, $compile, compiled, $window, $provide;
		beforeEach(function(){
			  $window = {location: { replace: jasmine.createSpy()} };

     			 module(function($provide) {
       			 $provide.value('$window', $window);
      				});


			inject(function(_$compile_, $rootScope, _$location_){
			
			$scope = $rootScope.$new();
			$location = _$location_;
			$compile = _$compile_;
			
	
      		
		});
	});


	it('should redirect to email domain', function(){
		var element = angular.element(
			
			'<a email-button="model.email" id="em" class= "and">dir</a>'
			);
		$compile(element)($scope);
		$scope.model = {email: 'kov@gmail.com'}
		form = $scope.form;
		$scope.$digest();
		element.triggerHandler({type: 'click', keyCode: 27 });
		expect($window.location.href).toEqual('http://www.gmail.com');
	
	});

	});

	describe('DateFormatter', function(){
		beforeEach(inject(function(_$compile_, _$rootScope_){
			$scope = _$rootScope_.$new();
			$compile = _$compile_;

		}));
		it('should reformatting date', function(){
			var element2 = angular.element(
				'<form name="form">'+
				'<input type="text" date-formater ng-model="date.order_in" name="date">'+
				'</form>'
				);
			$scope.date = {order_in : '2016-04-04'}
			$compile(element2)($scope);
			form = $scope.form;
			$scope.$digest();
			expect(form.date.$viewValue).toEqual('04/04/2016');
			

		});

	

	});

	describe('pwMatch', function(){
		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
			$scope = _$rootScope_.$new();
			var element3 = angular.element(
				'<form name="form">'+
				'<input type="text" name="passw1" ng-model="reg.passw1">'+
				'<input type="text" name="passw2" ng-model="reg.passw2" pw-match="reg.passw1">'+
				'</form>'
				);
			$compile(element3)($scope);
			form = $scope.form;
			

		}));
		it('should test equal passw', function(){
			$scope.reg = {passw1:'a4Fn2U4@', passw2: 'a4Fn2U4@'}
			$scope.$digest();
			expect(form.$valid).toBeTruthy();
			

		});
		it('should test no equal passw', function(){
			form.passw1.$setViewValue('a4Fn2U4');
			$scope.$digest();
			expect(form.$valid).toBeFalsy();
			form.passw2.$setViewValue('a4Fn2');
			$scope.$digest();
			expect(form.$valid).toBeFalsy();
		});

		it('should test passw pattern', function(){
			$scope.reg = {passw1:'aaaaaa', passw2: 'aaaaaa'}
			$scope.$digest();
			expect(form.$valid).toBeFalsy();
			form.passw1.$setViewValue('aaaaaA');
			form.passw2.$setViewValue('aaaaaA');
			$scope.$digest();
			expect(form.$valid).toBeFalsy();
			
		});

	});

	describe('rusEngName', function(){
		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
			$scope = _$rootScope_.$new();

			var element4 = angular.element(
				'<form name="form">'+
				'<input type="text" rus-eng-name name="username" ng-model="user.name">'+
				'</form>'
				);

			$compile(element4)($scope);
			form = $scope.form;
			}));

		it('should test english name', function(){
			form.username.$setViewValue('Andy');
			$scope.$digest();
			expect(form.$valid).toBeTruthy();

		});
		it('should test Rus name', function(){
			form.username.$setViewValue('Aндрей');
			$scope.$digest();
			expect(form.$valid).toBeTruthy();
		});
		it('should false when be letters or digits', function(){

			form.username.$setViewValue('A');
			$scope.$digest();
			expect(form.$valid).toBeFalsy();
			form.username.$setViewValue('Andy22');
			expect(form.$valid).toBeFalsy();
			
		});

	});


});