'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('hostelApp', [
    'ngAnimate',
    'ngResource', 
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMessages',
    'uiGmapgoogle-maps',
    'ui.mask',
    'ngMaterial',
    'ui.bootstrap',
    'ui.router',
    'mainPage',
    'registrationAuth',
    'ngQuickDate',
    'OrderRoom',
    'directive-hostel',


  ]).config( function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, ngQuickDateDefaultsProvider){

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $urlRouterProvider.otherwise("/");

    ngQuickDateDefaultsProvider.set({
    closeButtonHtml: "<i class='fa fa-times'></i>",
    buttonIconHtml: "<i class='fa fa-calendar right'></i>",
    nextLinkHtml: "<i class='fa fa-chevron-right'></i>",
    prevLinkHtml: "<i class='fa fa-chevron-left'></i>"
    });

    $stateProvider.state('mainpage',{
      url:'/',
      resolve:{
          Rooms: 'Rooms',
          allRooms : function(Rooms){
            return Rooms.query().$promise;
          }
      },
      templateUrl:'static/view/main/main.tpl.html',
      controller : 'MainPageCtrl',
            
    })
    .state('mainpage.detail',{
      url: 'detail/:roomId',
         resolve: {
          Rooms : 'Rooms',
          getRoom : function(Rooms, $stateParams){
            var roomId = $stateParams.roomId;
            return Rooms.get({roomId: roomId}).$promise;
          }
      },
      onEnter:[ '$state', '$uibModal', '$resource', 'getRoom',  function($state, $uibModal, $resource, getRoom ){

        $uibModal.open({
              resolve:{
                getRoom: function(){
                  return getRoom;
                }
              },
              templateUrl: 'static/view/roomdetail/room-detail.tpl.html',
              controller: 'DetailPageCtrl',
              size: 'lg',
              windowTopClass: 'hoverable'

        })
        .result.finally(function(){
          $state.go('^');
        });
      }]
    })
     .state('mainpage.register',{
      url: 'registration/',
       onEnter:['$stateParams', '$state', '$uibModal', '$resource', function($stateParams, $state, $uibModal, $resource){
        $uibModal.open({
              templateUrl: 'static/view/registration-auth/registration/user-registration.tpl.html',
              //controller: 'RegistrationCtrl',
              size: 'lg',
              windowTopClass: 'hoverable'

        })
        .result.finally(function(){
          $state.go('^');
        });
      }]
    })
    .state('mainpage.login',{
      url:'login/',
      onEnter:['$uibModal', '$state', function($uibModal, $state){
        $uibModal.open({
          templateUrl: 'static/view/registration-auth/login/login.tpl.html',
          controller: 'LoginCtrl'


        })
        .result.finally(function(){
          $state.go('^');
        });


      }]

    })
   
   
    .state('googlelogin',{
      url:'^/accounts/google/login/',
      controller: function($window){
        $window.location.href="/accounts/google/login/"
      }
      
    })
    .state('logout', {
      url:'logout/',
      controller:'LogoutCtrl',

    });

    $locationProvider.html5Mode({
  enabled: true,
  //requireBase: false
});

  });
  
 angular.module('mainPage', []);
 angular.module('registrationAuth', []);
 angular.module('OrderRoom', []);
 angular.module('directive-hostel', []);