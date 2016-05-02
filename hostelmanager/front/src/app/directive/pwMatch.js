(function(){
 'use strict';
angular.module('directive-hostel').directive('pwMatch', [function(){
	return{
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl){
			function validateEqual(myValue){
					var equal = (myValue === scope.$eval(attrs.pwMatch));
					ctrl.$setValidity('pwchek', equal);
					return equal ?  myValue : undefined;
	
			}
	
			function regCheck(){	
				//password must contain one Big,small, and numeric from 6 to 16
				var reg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,16}$/;
					var pww = scope.$eval(attrs.pwMatch);
					var reg_chek = reg.test(pww);
					ctrl.$setValidity('regchek', reg_chek);
			}

			ctrl.$parsers.push(validateEqual);
			ctrl.$formatters.push(validateEqual);

			scope.$watch(attrs.pwMatch, function(){
				regCheck();
				
				ctrl.$$parseAndValidate(ctrl.$viewValue);
			});

		}
	};


}]);

})();