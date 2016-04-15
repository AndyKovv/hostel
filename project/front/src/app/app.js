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
    'ngResource',
    'ngCookies',
    'ngAria',
    'ngSanitize',
    'ngMessages',
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'mainPage',
    'registrationAuth',
    'OrderRoom',
    'directive-hostel',
    'userAccount',
    'dry',
    


  ]).config( function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $urlRouterProvider.otherwise("/");
    
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
       onEnter:['$state', '$uibModal', function($state, $uibModal){
        $uibModal.open({
              templateUrl: 'static/view/registration-auth/registration/user-registration.tpl.html',
              controller: 'RegistrationCtrl',
              size: 'md',
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
    .state('mainpage.account_settings', {
      url: 'settings/',
      onEnter:['$uibModal', '$state', function($uibModal, $state){
        $uibModal.open({
          templateUrl: 'static/view/account/settings.tpl.html',
          controller: 'userAccountCtrl'

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
    .state('vklogin',{
      url:'^/accounts/vk/login/',
      controller: function($window){
        
        $window.location.href ="/accounts/vk/login/";
      }
      
    })
    .state('logout', {
      url:'logout/',
      controller:'LogoutCtrl',

    })    
    .state('verify', {
      url: '^/verifyEmail/:emailVerificationToken/',
      controller: 'VerifyEmailCtrl',

     });

    $locationProvider.html5Mode({
  enabled: true,

});

  });
  
 angular.module('mainPage', ['uiGmapgoogle-maps','ui.mask', 'ui.bootstrap','ngQuickDate', 'toastr'])
 .config(function(ngQuickDateDefaultsProvider, toastrConfig){
 ngQuickDateDefaultsProvider.set({
    closeButtonHtml: "<i class='fa fa-times'></i>",
    buttonIconHtml: "<i class='fa fa-calendar right'></i>",
    nextLinkHtml: "<i class='fa fa-chevron-right'></i>",
    prevLinkHtml: "<i class='fa fa-chevron-left'></i>"
    });

   angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-bottom-left',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });

 });

 angular.module('registrationAuth', ['toastr']);
 angular.module('OrderRoom', []);
 angular.module('directive-hostel', []);
 angular.module('dry', []);
 angular.module('userAccount', []);

