angular.module('OrderRoom').factory('OrderRoomService',[ '$http', '$q', '$cookies',  function ($http, $q, $cookies ) {
		return {

			chekFreePlace : function(data){
				return	$http.post('/api/orders/chek_room/', data);
           
			},
		
			chekFreePlaces: function(data){
				var deferred = $q.defer()
				$http({
					url:'/api/orders/manager_filter/',
					method: 'POST',
					headers: {'X-CSRFToken':$cookies['csrftoken']},
					data: data
				})
				.success(function(data){
					deferred.resolve(data);
				}).
				error(function(data){
					deferred.reject()
				});
				return deferred.promise;
			},

			orderRoom: function(data){
				var deferred = $q.defer();
					 $http({
					 		url: '/api/orders/order_room/',
							method: 'POST',
							headers: {'X-CSRFToken': $cookies['csrftoken']},
							data: data
					
					})
					.success(function(data, status, headers, config){
							
						deferred.resolve(data);
					})
					.error(function(data, status, headers, config){
						deferred.reject(data);
					});
				return deferred.promise;
			},

			getOrders: function(){
				var deferred = $q.defer();
				$http({
					url:'/api/orders/order_list/',
					method: 'GET',
					headers:{'X-CSRFToken': $cookies['csrftoken']},
				})
				.success(function(data, status, headers, config){
					
					deferred.resolve(data)
				})
				.error(function(data, status, headers, config){
					deferred.reject(data);
				});
				return deferred.promise;
			},

			orderInfo: function(key){
				var deferred = $q.defer();
				$http({
					url:'/api/orders/order_info/',
					method: 'POST',
					data: key,
					headers:{'X-CSRFToken': $cookies['csrftoken']},
				})
				.success(function(data, status, headers, config){
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config){
					deferred.reject(data);
				});
				return deferred.promise;
			},

			createPdf: function(data){
				var deferred = $q.defer();
				$http({
					url:'/api/orders/pdfcreator/',
					method: 'POST',
					data : data,
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