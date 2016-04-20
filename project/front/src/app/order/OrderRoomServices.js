angular.module('OrderRoom').factory('OrderRoomService',[ '$http', '$q', '$cookies',  function ($http, $q, $cookies ) {
		return {

			chekFreePlace : function(data){
				return	$http.post('/api/orders/chek_room/', data);
           
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
							console.log('OrderRoomService' + data.order_id);
						deferred.resolve(data.order_id);
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
				}).
				success(function(data){
					//console.log('getOrders' + data);
					deferred.resolve(data)
				}).
				error(function(data){
					deferred.reject(data);
				});
				return deferred.promise;
			}


		};
	
}]);