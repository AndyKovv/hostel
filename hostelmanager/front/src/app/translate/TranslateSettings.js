angular.module('translateModule', ['pascalprecht.translate']).config(['$translateProvider',  function($translateProvider){
	   var translationsEN = {
	   	// Index.html
        SING_IN: 'Sing in',
        MY_ORDERS: 'My Orders',
        USER_SETTINGS: 'Settings',
        DO_ORDER: 'Receive order',
        MANAGER_ORDER_LIST: 'Order list',
        SING_OUT: 'Sing out',
        //User Settings.tpl
        USER_PROFILE: 'Profile',
        USER_SECURITY: 'Security settings',
        //ProfileForm.tpl
        USER_FIRST_NAME: 'First Name',
        USER_MIDDLE_NAME: 'Middle Name',
        USER_LAST_NAME: 'Last Name',
        USER_FIRST_NAME_ERROR_MESSAGE: 'First Name must contain only letters and be more than two letter',
        USER_MIDDLE_NAME_ERROR_MESSAGE: 'Middle Name must contain only letters and be more than two letter',
        USER_LAST_NAME_ERROR_MESSAGE: 'Last Name must contain only letters and be more than two letter',
        USER_PHONE: 'Phone Number',
        USER_ERROR_ENTER_FIELD: 'All fields must be entered',
        USER_SUCCES_UPDATE_PROFILE: 'Success update user profile',
        USER_PROFILE_UPD_BUTTON: 'Update',
        //change-passw.tpl
        USER_OLD_PASSWORD: 'Old Password',
        USER_NEW_PASSWORD: 'New Password',
        USER_REPEAT_PASSWORD: 'Repeat Password',
        USER_ERR_PW_NOT_MATCH: 'Password Not Match',
        USER_ERR_PW_RULE: 'Password must contain at least one big letter an one numeric character and be more 6 characters',
        USER_UPD_PW_BT: 'Update Password',

      };
 
      var translationsUK= {
      	//Index.html
        SING_IN: 'Вхід/Реєстрація',
        MY_ORDERS: 'Мої замовлення',
        USER_SETTINGS: 'Налаштування',
        DO_ORDER: 'Отримати замовлення',
        MANAGER_ORDER_LIST: 'Список замовлень',
        SING_OUT: 'Вихід',
        	//User Settings.tpl
        	USER_PROFILE: 'Профіль',
        	USER_SECURITY: 'Безпека', 
        		//ProfileForm.tpl
        		USER_FIRST_NAME: 'Ім’я',
        		USER_MIDDLE_NAME: 'Прізвище',
        		USER_LAST_NAME: 'По Батькові',
        		USER_FIRST_NAME_ERROR_MESSAGE: 'Ім`я повинно містити тільки букви і бути більш ніж дві букви', 
        		USER_MIDDLE_NAME_ERROR_MESSAGE: 'Прізвище повинно містити тільки букви і бути більш ніж дві букви',
        		USER_LAST_NAME_ERROR_MESSAGE: 'По Батькові повинно містити тільки букви і бути більш ніж дві букви',
        		USER_PHONE: 'Номер Телефона (моб.)', 
        		USER_ERROR_ENTER_FIELD: 'Кожне поле має бути заповнене коректно',
        		USER_SUCCES_UPDATE_PROFILE: 'Профіль користувача оновлений вдало',
        		USER_PROFILE_UPD_BUTTON: 'Оновити',
        		//change-passw.tpl
        		USER_OLD_PASSWORD: 'Старий пароль',
	       		USER_NEW_PASSWORD: 'Новий пароль',
	       		USER_REPEAT_PASSWORD: 'Повторіть ще раз',
	       		USER_ERR_PW_NOT_MATCH: 'Паролі не збігаються',
	       		USER_ERR_PW_RULE: 'Пароль повинен містити принаймні одину велику літеру, одину цифру і бути більшим за 6-ть символів',
	       		USER_UPD_PW_BT: 'Оновити пароль',

      };
	var translationsRU= {
	  //Index.html
	  SING_IN: 'Вход/Реестрация',
	  MY_ORDERS: 'Мои заказы',
	  USER_SETTINGS: 'Настройки',
	  DO_ORDER: 'Получить заказ',
	  MANAGER_ORDER_LIST: 'Список заказов',
	  SING_OUT: 'Выход',
	  	//User Settings.tpl
	  	USER_PROFILE: 'Профиль',
	  	USER_SECURITY: 'Безопасность',
	  		//ProfileForm.tpl
	  		USER_FIRST_NAME: 'Имя',
	  		USER_MIDDLE_NAME: 'Фамилия',
	  		USER_LAST_NAME: 'Отчество',
	  		USER_FIRST_NAME_ERROR_MESSAGE: 'Имя должно содержать только буквы и быть более чем из двух букв',
	  		USER_MIDDLE_NAME_ERROR_MESSAGE: 'Фамилия должно содержать только буквы и быть более чем из двух букв',
	  		USER_LAST_NAME_ERROR_MESSAGE: 'Отчество должно содержать только буквы и быть более чем из двух букв',
	  		USER_PHONE: 'Номер Телефона (моб.)',
	  		USER_ERROR_ENTER_FIELD: 'Все поля должны быть заполнены корректно',
	  		USER_SUCCES_UPDATE_PROFILE: 'Профиль пользователя удачно обновлён',
	  		USER_PROFILE_UPD_BUTTON: 'Обновить',
	  		//change-passw.tpl
	  		USER_OLD_PASSWORD: 'Старый пароль',
	  		USER_NEW_PASSWORD: 'Новый пароль',
	  		USER_REPEAT_PASSWORD: 'Повторите ёще раз',
	  		USER_ERR_PW_NOT_MATCH: 'Пароли не совпадают',
	  		USER_ERR_PW_RULE: 'Пароль должен содержать по крайней мере одину большую букву, одину цифру и быть более 6-ти символов',
	  		USER_UPD_PW_BT: 'Обновить пароль',



	
	 
	};    
      $translateProvider.useSanitizeValueStrategy('sanitize');
      $translateProvider
      .translations('en', translationsEN)
      .translations('uk', translationsUK)
      .translations('ru', translationsRU)
      .registerAvailableLanguageKeys(['en', 'uk', 'ru'], {
      'en_*': 'en',
      'uk_*': 'uk',
      'ru_*': 'ru',
      })
      .determinePreferredLanguage();
     $translateProvider.fallbackLanguage('en');
}]);