(function(){
 'use strict';

angular.module('mainPage')
  .factory('Rooms',['$resource', function ($resource) {
   return $resource('/api/rooms/:roomId.json');
    
  }]);
  
})();