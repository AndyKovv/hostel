(function(){
 'use strict';

angular.module('directive-hostel').directive('rusEngName', [function () {
	return{
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl){
			function validateName(myValue){
				
				var reg = /^([A-zА-яЁё_]{2,6})+$/;
				var equal = reg.test(myValue);
				ctrl.$setValidity('namecheck', equal);
				return equal ? myValue : undefined;
			}

			ctrl.$parsers.push(validateName);
		}

	};
}]);

})();