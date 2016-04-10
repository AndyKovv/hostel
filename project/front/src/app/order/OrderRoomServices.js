angular.module('OrderRoom').factory('OrderRoomService',[ '$http',  function ($http) {
		return {

			chekFreePlace : function(data){
				return	$http.post('/api/orders/chek_room/', data);
           
			}


		};
	
}]);