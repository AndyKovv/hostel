'use strict';

angular.module('directive-hostel').directive('emailButton',[ '$window', function($window){
return{
	link: function(scope, elem, attrs ){
			function cleanDomen(){
					var attrs_value = scope.$eval(attrs.emailButton);
					var email = 'test@gmail.com';
					var domain = attrs_value.replace(/.*@/, "");
					var redirect_url = 'http://www.'+ domain;
					$window.location.href =redirect_url;
					
			}

		elem.bind('click', function(){
			cleanDomen()
			
		});
	}

}

}]);