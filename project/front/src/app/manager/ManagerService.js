angular.module('managerModule')
	.factory('ManagerService', [ '$http', '$q', '$cookies',  function ($http, $q, $cookies ){
		return{
			getManagerOrders: function(){
				var deferred = $q.defer();
				$http({
					url: '/api/manager/',
					method: 'GET',
					headers: {'X-CSRFToken': $cookies['csrftoken']},
				})
				.success(function(data, status, headers, config){
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config){
					deferred.reject(data);
				});
				return deferred.promise;
			},

			managerPayment: function(data){
				var deferred = $q.defer();
				$http({
					url: '/api/manager/payment/',
					method: 'POST',
					headers: {'X-CSRFToken': $cookies['csrftoken']},
					data: data,
				})
				.success(function(data, status, headers, config){
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config){
					deferred.reject(data);
				});
				return deferred.promise;
			}
		};

}]);