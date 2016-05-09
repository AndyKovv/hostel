(function(){
 'use strict';

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
    'managerModule',
    'translateModule',
    'dry',
    
    


  ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
       function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

   


    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $urlRouterProvider.otherwise("/");
    
    $stateProvider.state('mainpage',{
      url:'/',
      resolve:{
          
          allRooms : ['Rooms', function(Rooms){
            return Rooms.query().$promise;
          }]
      },
      templateUrl:'main/main.tpl.html',
      controller : 'MainPageCtrl',
   })
    .state('mainpage.detail',{
      url: 'detail/:roomId/',
         resolve: {
          
          getRoom :['Rooms', '$stateParams', function(Rooms, $stateParams){
            var roomId = $stateParams.roomId;
            return Rooms.get({roomId: roomId}).$promise;
          }]
      },
      onEnter:[ '$state', '$uibModal', 'getRoom',  function($state, $uibModal, getRoom ){
        $uibModal.open({
              resolve:{
                getRoom: function(){
                  return getRoom;
                }
              },
              templateUrl: 'roomdetail/room-detail.tpl.html',
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
      param: {
        authenticated: false,
        redirectTo: 'mainpage',
      },
       onEnter:['$state', '$uibModal', 'dryAuth', function($state, $uibModal, dryAuth){
        if(!dryAuth.chekStatus()){
          $uibModal.open({
              templateUrl: 'registration-auth/registration/user-registration.tpl.html',
              controller: 'RegistrationCtrl',
              size: 'md',
              windowTopClass: 'hoverable'
        })
        .result.finally(function(){
          $state.go('^');
        });
        }
      }]
    })
    .state('mainpage.passw_reset', {
      url: 'passw_reset/',
      param:{
        authenticated: false,
        redirectTo: 'mainpage',
      },
      onEnter:['$state', '$uibModal', 'dryAuth', function($state, $uibModal, dryAuth){
          if(!dryAuth.chekStatus()){
            $uibModal.open({
              templateUrl: 'registration-auth/forgot-password/password-reset-form.tpl.html',
              controller: 'PasswordResetCtrl',
              size: 'md',
            }).result.finally(function(){
              $state.go('^');
            });
          }
      }]
    })
    .state('mainpage.passw_reset_confirm', {
      url: 'password-reset/confirm/:firstToken/:passwordResetToken/',
      param:{
        authenticated: false,
        redirectTo: 'mainpage',
      },
      onEnter:['$state', '$uibModal', 'dryAuth', function($state, $uibModal, dryAuth){
        if(!dryAuth.chekStatus()){
          $uibModal.open({  
            templateUrl: 'registration-auth/forgot-password/password-reset-confirm-form.tpl.html',
            controller: 'PasswordResetCtrl',
            size: 'md',
          }).result.finally(function(){
            $state.go('^');
          });
        }
      }]
    })
    .state('mainpage.login',{
      url:'login/',
      param: {
        authenticated: false,
        redirectTo: 'mainpage',
      },
      onEnter:['$uibModal', '$state', 'dryAuth', function($uibModal, $state, dryAuth){
        if(!dryAuth.chekStatus()){
          $uibModal.open({
            templateUrl: 'registration-auth/login/login.tpl.html',
            controller: 'LoginCtrl'
         })
          .result.finally(function(){
            $state.go('^');
          });
       }
      }]
    })
    .state('mainpage.account_settings', {
      url: 'settings/',
      param: {
      authenticated: true,
      redirectTo: 'mainpage.login'
      },
      onEnter:['$uibModal', '$state', 'dryAuth',  
        function($uibModal, $state, dryAuth ){
             if(dryAuth.chekStatus()){
                $uibModal.open({
                  templateUrl: 'user-account/user-settings.tpl.html',
                  controller: 'userAccountCtrl',
                  size: 'md',
                })
                  .result.finally(function(){
                     $state.go('^');
                   });
            }
      }]
     })
    .state('mainpage.account_orders', {
      url: 'orders/',
      param: {
        authenticated: true,
        redirectTo:'mainpage.login'
      },
      resolve: {
        getOrdersList: ['OrderRoomService', function(OrderRoomService){
            return OrderRoomService.getOrders();
        }]
      },
      onEnter:['$uibModal', '$state', 'dryAuth', 'getOrdersList',
      function($uibModal, $state, dryAuth, getOrdersList){
        if(dryAuth.chekStatus()){
            $uibModal.open({
            resolve:{
                getOrdersList: function(){
                    return getOrdersList;
                }
            },
            templateUrl: 'order/order-list.tpl.html',
            controller: 'OrderListCtrl',
            size: 'lg',
          })
            .result.finally(function(){
              $state.go('^');
            });
        }
      }]
    })
     .state('mainpage.orderinfo', {
      url: 'orderinfo/:orderInformationToken/',
      resolve: {
        getOrderInfo: ['OrderRoomService', '$stateParams',
        function(OrderRoomService, $stateParams){
          return OrderRoomService.orderInfo({key: $stateParams.orderInformationToken});
        }]
      },
      onEnter:['$state', '$uibModal', 'getOrderInfo',
      function($state, $uibModal, getOrderInfo){
        $uibModal.open({
          resolve:{
            getOrderInfo:function(){
              return getOrderInfo;
            }
          },
          templateUrl: 'order/order-info/order-info.tpl.html',
          controller: 'OrderInfoCtrl',
          size: 'lg',

        }).result.finally(function(){
          $state.go('^');
        });
      }]
    })
    .state('mainpage.error_payment', {
      url: 'error_payment/',
      onEnter: ['$state', '$uibModal', function(){
        $uibModal.open({
          templateUrl: 'order/payment/error-payment.tpl.html',
          controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
            $scope.close = function(){
              $uibModalInstance.close();
            };
          }]  
        }).result.finally(function(){
          $state.go('^');
        });
      }]
    })
    .state('manager_main',{
      url:'^/manager/',
      resolve:{
        getAllRooms: ['Rooms', function(Rooms){
            return Rooms.query().$promise;
        }]
      },
      param:{
        authenticated: true,
        redirectTo: 'mainpage',
      },
      controller: 'ManagerCtrl',
      templateUrl: 'manager/manager-main-page.tpl.html'
    })
    .state('manager_order_list',{
      url: '^/order_list/',
      resolve:{
        managerOrders: ['ManagerService', function(ManagerService){
          return ManagerService.getManagerOrders();
        }]
      },
      param:{
        authenticated: true,
        redirectTo: 'mainpage'
      },
      templateUrl: 'manager/manager-list/manager-order-list.tpl.html',
      controller: 'ManagerOrderListCtrl',

    })      
    .state('googlelogin',{
      url:'^/accounts/google/login/',
      controller:[ '$window', function($window){
        $window.location.href='/accounts/google/login/';
      }]
      
    })
    .state('vklogin',{
      url:'^/accounts/vk/login/',
      controller:['$window', function($window){
        $window.location.href ="/accounts/vk/login/";
      }]
    })
    .state('facebooklogin',{
      url:'^/accounts/facebook/login/',
      controller:['$window', function($window){
        $window.location.href ="/accounts/facebook/login/";
      }]
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

  }]);
  
 angular.module('mainPage', ['uiGmapgoogle-maps','ui.mask', 'ui.bootstrap','ngQuickDate', 'toastr'])
 .config(['ngQuickDateDefaultsProvider', 'toastrConfig', 'uiGmapGoogleMapApiProvider', 
    function(ngQuickDateDefaultsProvider, toastrConfig, uiGmapGoogleMapApiProvider){
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
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyD7gca_XV2K1bT5Rb5mWlBpfjYTetkPpMI',
        libraries: 'weather,geometry,visualization'
    });

 }]);
})();

 angular.module('registrationAuth', ['toastr', 'ui.bootstrap']);
 angular.module('OrderRoom', ['ui.bootstrap']);
 angular.module('directive-hostel', []);
 angular.module('dry', []);
 angular.module('userAccount', []);
 angular.module('managerModule', []);
 

 

