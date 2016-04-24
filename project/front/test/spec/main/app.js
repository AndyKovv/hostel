describe('HostelApp', function(){
	beforeEach(module('hostelApp'));
	beforeEach(module('ngResource'));
    beforeEach(module('ngCookies'));
    beforeEach(module('ngAria'));
    beforeEach(module('ngSanitize'));
    beforeEach(module('ngMessages'));
    beforeEach(module('ngAnimate'));
    beforeEach(module('ngMaterial'));
    beforeEach(module('ui.router'));
    beforeEach(module('mainPage'));
    beforeEach(module('registrationAuth'));
    beforeEach(module('OrderRoom'));
    beforeEach(module('directive-hostel'));
    beforeEach(module('userAccount'));
    beforeEach(module('dry'));

    var $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $state, $resolve;
    beforeEach(inject(function(_$state_, _$resolve_){
    	
    	
    	
    	$state = _$state_;
    	$resolve = _$resolve_;
    	
    }));
    
    	it('should test mainpage state', function(){
       expect($state.href("mainpage")).toEqual("/");
   });
        
        it('should test mainpage.detail state', function(){
        	var state = $state.get('mainpage.detail');
       expect($state.href("mainpage.detail", {roomId : '1'})).toEqual("/detail/1/");
       expect(state.onEnter).toBeTruthy();

   });

          it('should test mainpage.register state', function(){
          	var state = $state.get('mainpage.register');
       expect($state.href("mainpage.register")).toEqual("/registration/");
       expect(state.onEnter).toBeTruthy();
       expect(state.param.authenticated).toEqual(false);
       expect(state.param.redirectTo).toEqual('mainpage');
   });
        it('should test mainpage.login state', function(){
        	var state = $state.get('mainpage.login');
       expect($state.href("mainpage.login")).toEqual("/login/");
       expect(state.onEnter).toBeTruthy();
       expect(state.param.authenticated).toEqual(false);
       expect(state.param.redirectTo).toEqual('mainpage');

   });
        it('should test mainpage.account_settings state', function(){
        	var state = $state.get('mainpage.account_settings');
       expect($state.href("mainpage.account_settings")).toEqual("/settings/");
       expect(state.param.authenticated).toEqual(true);
       expect(state.param.redirectTo).toEqual('mainpage.login');
       expect(state.onEnter).toBeTruthy();
      
   });

	    it('should test mainpage.account_orders state', function(){
	    	var state = $state.get('mainpage.account_orders');
       expect($state.href("mainpage.account_orders")).toEqual("/orders/");
       expect(state.param.authenticated).toEqual(true);
       expect(state.param.redirectTo).toEqual('mainpage.login');
       expect(state.onEnter).toBeTruthy();
       expect(state.resolve.getOrdersList).toBeTruthy();

   });
	    it('should test googlelogin state', function(){
	    	var state = $state.get('googlelogin');
	    	expect($state.href("googlelogin")).toEqual('/accounts/google/login/');
	    	expect(state.controller).toBeTruthy();

	    });

		it('should test vklogin state', function(){
	    	var state = $state.get('vklogin');
	    	expect($state.href("vklogin")).toEqual('/accounts/vk/login/');
	    	expect(state.controller).toBeTruthy();

	    });

	    it('should test logout state', function(){
	    	var state = $state.get('logout');
	    	expect($state.href("logout")).toEqual('logout/');
	    	expect(state.controller).toBeTruthy();

	    });


	    it('should test verify state', function(){
	    	var state = $state.get('verify');
	    	expect($state.href("verify", {emailVerificationToken: 'sdadsadasdad'})).toEqual('/verifyEmail/sdadsadasdad/');
	    	expect(state.controller).toEqual('VerifyEmailCtrl');

	    });

      it('should test mainpage.orderinfo state', function(){
        var state = $state.get('mainpage.orderinfo');
        expect($state.href("mainpage.orderinfo", {orderInformationToken : 'asasasasasdsdfdgf'})).toEqual('/orderinfo/asasasasasdsdfdgf/');
        
      });

      it('should test mainpage.passw_reset', function(){
          var state = $state.get('mainpage.passw_reset');
          expect($state.href("mainpage.passw_reset")).toEqual('/passw_reset/');
          expect(state.param.authenticated).toEqual(false);
          expect(state.param.redirectTo).toEqual('mainpage');

      });

      it('should test mainpage.passw_reset_confirm', function(){
        var state  = $state.get('mainpage.passw_reset_confirm');
        expect(state.param.authenticated).toEqual(false);
        expect(state.param.redirectTo).toEqual('mainpage');
        expect($state.href("mainpage.passw_reset_confirm", {
          firstToken: 'firstToken',
          passwordResetToken: 'passwordResetToken'})).toEqual('/password-reset/confirm/firstToken/passwordResetToken/');
      });



});