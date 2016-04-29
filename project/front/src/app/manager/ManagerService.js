angular.module('managerModule')
	.factory('ManagerService', [ '$http', '$q', '$filter', '$cookies',  function ($http, $q, $filter, $cookies ){
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
			},

			deselectedOrder: function(data){
				var deferred = $q.defer();
				$http({
					url: '/api/manager/deselect_order/',
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
			},
			filterOrder: function(filter){
				var deferred = $q.defer();
				if(filter.date_in && filter.date_out){
					var date_in_date = $filter('date')(filter.date_in, 'yyyy-MM-dd')  
					var date_out_date = $filter('date')(filter.date_out, 'yyyy-MM-dd')
					   
				}
				$http({
					url: '/api/manager/',
					method: 'GET',
					params:{
						id: filter.number_order,
						search: filter.person_info,
						date_in_0: date_in_date,
						date_in_1: date_out_date,
						
						},
					headers: {'X-CSRFToken': $cookies['csrftoken']},
				})
				.success(function(data, status, headers, config){
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config){
					deferred.reject();
				});
				return deferred.promise;
			}
		};

}]);