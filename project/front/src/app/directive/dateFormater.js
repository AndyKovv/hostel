angular.module('directive-hostel').directive('dateFormater', function($filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl){

			ngModelCtrl.$formatters.push(function(data){

				//var formated_date = angular.toJson(data).slice(1,11);
				return $filter('date')(data, 'MM/dd/yyyy');
				
			});
		}
	}



});