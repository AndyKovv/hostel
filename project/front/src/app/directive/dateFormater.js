angular.module('directive-hostel').directive('dateFormater', function($filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl){

			ngModelCtrl.$formatters.push(function(data){
				console.log('date-formatter' + $filter('date')(data, 'MM/dd/yyyy'));
				
				return $filter('date')(data, 'MM/dd/yyyy');
				
			});
		}
	}



});