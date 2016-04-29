'use strict';

angular.module('mainPage')
  .factory('Rooms', function ($resource) {
   return $resource('/api/rooms/:roomId.json');
    
  });