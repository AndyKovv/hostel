(function(){
 'use strict';

angular.module('translateModule', ['pascalprecht.translate']).config(['$translateProvider',  function($translateProvider){
	   var translationsEN = {
	   	// Index.html
        SING_IN: 'Sing in',
        MY_ORDERS: 'My Orders',
        USER_SETTINGS: 'Settings',
        DO_ORDER: 'Receive order',
        MANAGER_ORDER_LIST: 'Order list',
        SING_OUT: 'Sing out',
        MAIN_MAP: 'location',
        MAIN_PAGE_MAIN_MAP_HEADER: 'Rooom Location',
        ORDER_PAYMENT_FALSE_HEADER: 'Error Confirm Payment',
        CONTACT_MANAGER: 'Please contact our manager +380685087802',
        MAIN_ABOUT_US: 'ABOUT US',
        MAIN_CONTACT: 'CONTACT',
        MAIN_SOCIAL_MEDIA: 'SOCIAL',
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
        				//room-detail.tpl
        				ROOM_DETAIL_DESCRIPTION: 'Description :',
        				ROOM_DETAIL_BEDS: 'Beds in room :',
        				ROOM_DETAIL_PRICE: 'Price per bed :',
        				ROOM_DETAIL_LOCATION: 'Room location :',
        				ROOM_DETAIL_CHEK_FREE_PLACE: 'Order bed :',
        				ROOM_DETAIL_DATE_ARIVAL: 'Date arrival :',
        				ROOM_DETAIL_DATE_DISPATCH: 'Date dispatch :',
        				ROOM_DETAIL_ORDER_BT: 'Order',
        				ROOM_DETAIL_ORDEROCCUP_BT: 'Occupied, click to see free room',
        				ROOM_DETAIL_INTERVAL_BT: 'Please enter right interval',
        					//payment-confirm.tpl
        					PAYMENT_CONFIRM_ORDER: 'Order',
        					PAYMENT_CONFIRM_FROM: 'from',
        					PAYMENT_DATE_ARRIVAL: 'Date arrival:',
        					PAYMENT_DATE_DEPARTURE: 'Date departure:',
        					PAYMENT_PHONE_NUMBER: 'Phone Number:',
        					PAYMENT_EMAIL: 'Email:',
        					PAYMENT_FIRST_NAME: 'First Name:',
        					PAYMENT_MIDDLE_NAME: 'Middle Name:',
        					PAYMENT_LAST_NAME: 'Last Name:',
        					PAYMENT_AMMOUNT: 'Ammount:',
        						//order-room.tpl
        						ORDER_ORDER_FORM: 'Order Form',
        						ORDER_INP_DATE_ARIVAL: 'Date arrival',
        						ORDER_INP_DATE_DEPARTURE: 'Date departure',
        						ORDER_INP_EMAIL: 'Email',
        						ORDER_BT_ORDER: 'Order Bed',
        							//additional-room.tpl.
        							ADDITIONAL_ROOM_HEADER: 'Free Beds',
        							ADDITIONAL_ROOM_WATCH: 'Watch',
        							ADDITIONAL_ROOM_PRICE: 'Price for Bed :',
        							REGISTRATION_INFO_HEADER: 'Please enter additional information to you profile',
        							REGISTRATION_INFO_HEADER2: 'With this can be',
        							REGISTRATION_INFO_HEADER3: 'easy',
        							REGISTRATION_INFO_HEADER4: 'to use our service',
        						//user-register.tpl
        						USER_REGISTER_WITH: 'Register with :',
        						USER_REGISTER_OR: 'or:',
        						USER_REGISTER_PASSWORD1: 'Password',
        						USER_REGISTER_PASSWORD_REPEAT: 'Repeat password',
        						USER_SING_UP_BT: 'Sing Up',
        						USER_REGISTER_REGISTRATION_SUCESS: 'Registration',
        						USER_REGISTER_REGISTRATION1: 'success',
        						USER_REGISTER_CONFIRM_EMAIL: 'Please confirm email address to use all site opportunity',
        						USER_REGISTER_GO_TO_EMAIL: 'Go to Email',
        						USER_REGISTER_ALREADY: 'Already have an account?',
        						USER_REGISTER_LOGIN: 'Login',
        					//login.tpl
        					LOGIN_ERR_EMAIL: 'Not valid email! please enter a valid email',
        					LOGIN_NOT_A_MEMBER: 'Not a member?',
        					USER_REGISTER_FORGOT: 'Forgot',
        					USER_REGISTER_PASSWORD: 'Password?',
        					//password-reset-confirmation.tpl
        					PASSWORD_RESET_CONFIRMATION: 'Password reset confirmation',
        					PASSWORD_RESET_BT_CHANGE: 'Change',
        					//password-reset-form.tpl
        					PASSWORD_RESET_HEADER1: 'Please enter your email address for password',
        					PASSWORD_RESET_HEADER2: 'for password reset',
        					PASSWORD_RESET_HEADER_SUCCESS: 'Success reset password',
        					PASSWORD_RESET_CONFIRM_MESSAGE: 'Confirmation email send',
        					PASSWORD_RESET_BT: 'Reset password',
        					//order-list.tpl
        					ORDER_LIST_HEADER: 'List Of Orders',
        					ORDER_LIST_ORDER: 'Order',
        					ORDER_LIST_ROOM: 'Room',
        					PERSON_FULL_NAME: 'Full Name',
        					ORDER_PHONE: 'Phone',
        					ORDER_PAYMENT: 'Payment',
        					ORDER_NO_ORDERS: 'No Orders',
        					//order-info.tpl
        					ORDER_INFO_HEADER: 'Order Information',
        					ORDER_INFO_ADDRESS: 'Address',
        					ORDER_PAYMENT_OK: 'Payment OK',
        					ORDER_PAYMENT_FALSE: 'Payment False',
        					//manager-main-page.tpl
        					MANAGER_MAIN_PAGE_HEADER: 'Receive order',
        					MANAGER_ORDER_BOOKING: 'Booking',
        					MANAGER_ORDER_DESELECTED: 'Deselected',
        					MANAGER_PAYMENT_TYPE: 'Payment Type',
        					MANAGER_PAYMENT_DATE: 'Payment Date',
        					MANAGER_MANAGER_ORDER: 'Manager',
        					MANAGER_PAYMENT_MONEY: 'UAH',
        					MANAGER_DESELECTED_REASON: 'Reason deselect order',
        					MANAGER_DESELECT_BT: 'Deselect order',
        					MANAGER_PAYMENT_METHOD1: 'Cash',
        					MANAGER_PAYMENT_METHOD2: 'Card PrivatBank',
        					MANAGER_PAY_BT: 'Pay',
        					//manager-order-list.tpl
        					MANAGER_ORDER_FILTER_ORDER: 'Enter Number Of Order',
        					MANAGER_ORDER_FILTER_USER: 'Name, Middle Name, Last Name',
        					MANAGER_ORDER_RESET_FILTER_BT: 'Reset all filters',
        					MANAGER_ORDER_DATE: 'Order date',
        					MANAGER_ORDER_ORDER_ERROR: 'No free place',











      };
 
      var translationsUK= {
      	//Index.html
        SING_IN: 'Вхід/Реєстрація',
        MY_ORDERS: 'Мої замовлення',
        USER_SETTINGS: 'Налаштування',
        DO_ORDER: 'Отримати замовлення',
        MANAGER_ORDER_LIST: 'Список замовлень',
        SING_OUT: 'Вихід',
        MAIN_PAGE_MAIN_MAP_HEADER: 'Місце розташування кімнати',
        ORDER_PAYMENT_FALSE_HEADER: 'Помилка підтвердження платежу',
        CONTACT_MANAGER: 'Будьласка зателефонуйте до менеджера +380685087802',
        MAIN_ABOUT_US: 'ПРО НАС',
        MAIN_CONTACT: 'КОНТАКТИ',
        MAIN_SOCIAL_MEDIA: 'МИ У СОЦІАЛЬНИХ МЕРЕЖАХ',
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
	       			//room-detail.tpl
	       			ROOM_DETAIL_DESCRIPTION: 'Опис :',
	       			ROOM_DETAIL_BEDS: 'Ліжок в кімнаті :',
	       			ROOM_DETAIL_PRICE: 'Ціна за ліжко-місце :',
	       			ROOM_DETAIL_LOCATION: 'Місцезнаходження кімнати :',
	       			ROOM_DETAIL_CHEK_FREE_PLACE: 'Замовити ліжко-місце :',
	       			ROOM_DETAIL_DATE_ARIVAL: 'Дата приїзду :',
	       			ROOM_DETAIL_DATE_DISPATCH: 'Дата відїзду :',
	       			ROOM_DETAIL_ORDER_BT: 'Замовити',
	       			ROOM_DETAIL_ORDEROCCUP_BT: 'Всі місця зайняті, дивитися в вільні',
	       			ROOM_DETAIL_INTERVAL_BT: 'Будь ласка , введіть правильний інтервал',
	       			//payment-confirm.tpl
	       			PAYMENT_CONFIRM_ORDER: 'Замовлення',
	       			PAYMENT_CONFIRM_FROM: 'від',
	       			PAYMENT_DATE_ARRIVAL: 'Дата приїзду:',
	       			PAYMENT_DATE_DEPARTURE: 'Дата відїзду:',
	       			PAYMENT_PHONE_NUMBER: 'Номер телефона:',
	       			PAYMENT_EMAIL: 'Електронна пошта:',
	       			PAYMENT_FIRST_NAME: 'Ім’я:',
	       			PAYMENT_MIDDLE_NAME: 'Прізвище:', 
	       			PAYMENT_LAST_NAME: 'По Батькові',
	       			PAYMENT_AMMOUNT: 'Сума:',
	       				//order-room.tpl
	       				ORDER_ORDER_FORM: 'Форма Замовлення',
	       				ORDER_INP_DATE_ARIVAL: 'Дата приїзду',
	       				ORDER_INP_DATE_DEPARTURE: 'Дата відїзду',
	       				ORDER_INP_EMAIL: 'Електронна пошта',
	       				ORDER_BT_ORDER: 'Замовити Ліжко',
	       					//additional-room.tpl
	       					ADDITIONAL_ROOM_HEADER: 'Вільні ліжка',
	       					ADDITIONAL_ROOM_WATCH: 'Перейти',
	       					ADDITIONAL_ROOM_PRICE: 'Ціна за ліжко :',
	       					REGISTRATION_INFO_HEADER: 'Будь ласка , введіть додаткову інформацію до профілю',
	       					REGISTRATION_INFO_HEADER2: 'З цим',
	       					REGISTRATION_INFO_HEADER3: 'легше',
	       					REGISTRATION_INFO_HEADER4: 'користуватися нашими сервісами',
	       				//user-registration.tpl.html
	       				USER_REGISTER_WITH: 'Зареэструватися через :',
	       				USER_REGISTER_OR: 'або :',
	       				USER_REGISTER_PASSWORD1: 'Пароль',
	       				USER_REGISTER_PASSWORD_REPEAT: 'Пароль ще раз',
	       				USER_SING_UP_BT: 'Зареэструватися',
	       				USER_REGISTER_REGISTRATION_SUCESS: 'Реєстрація',
	       				USER_REGISTER_REGISTRATION1: 'пройшла вдало',
	       				USER_REGISTER_CONFIRM_EMAIL: 'Будь ласка, підтвердіть адресу електронної пошти, щоб користуватись усіма можливостями сайту',
	       				USER_REGISTER_GO_TO_EMAIL: 'Перейти у скриньку',
	       				USER_REGISTER_ALREADY: 'Вже зареєстрований?',
	       				USER_REGISTER_LOGIN: 'Вхід',
	       				//login.tpl
	       				LOGIN_ERR_EMAIL: 'Невірний формат електронної пошти!',
	       				LOGIN_NOT_A_MEMBER: 'Ви не зареєстровані?',
	       				USER_REGISTER_FORGOT: 'Забули',
	       				USER_REGISTER_PASSWORD: 'Пароль?',
	       				//password-reset-confirmation.tpl
	       				PASSWORD_RESET_CONFIRMATION: 'Підтвердження скидання паролю',
	       				PASSWORD_RESET_BT_CHANGE: 'Змінити',
	       				//password-reset-form.tpl
	       				PASSWORD_RESET_HEADER1: 'Будь ласка вкажіть вашу електронну поштову скриньку',
	       				PASSWORD_RESET_HEADER2: 'для скидання паролю',
	       				PASSWORD_RESET_HEADER_SUCCESS: 'Пароль скинутий вдало',
	       				PASSWORD_RESET_CONFIRM_MESSAGE: 'Лист з підтвердженням відправлено',
	       				PASSWORD_RESET_BT: 'Скинути пароль',
	       				//order-list.tpl
	       				ORDER_LIST_HEADER: 'Перелік замовлень',
	       				ORDER_LIST_ORDER: 'Замовлення',
	       				ORDER_LIST_ROOM: 'Кімната',
	       				PERSON_FULL_NAME: 'П.І.Б.',
	       				ORDER_PHONE: 'Телефон',
	       				ORDER_PAYMENT: 'Оплата',
	       				ORDER_NO_ORDERS: 'Замовлення відсутні',
	       				//order-info.tpl
	       				ORDER_INFO_HEADER: 'Інформація про замовлення',
	       				ORDER_INFO_ADDRESS: 'Адреса',
	       				ORDER_PAYMENT_OK: 'Оплата ЗАРАХОВАНО',
	       				ORDER_PAYMENT_FALSE: 'Оплата відсутня',
	       				//manager-main-page.tpl
	       				MANAGER_MAIN_PAGE_HEADER: 'Зробити замовлення',
	       				MANAGER_ORDER_BOOKING: 'Заброньовано',
	       				MANAGER_ORDER_DESELECTED: 'Відмінено',
	       				MANAGER_PAYMENT_TYPE: 'Тип оплати',
	       				MANAGER_PAYMENT_DATE: 'Дата оплати',
	       				MANAGER_MANAGER_ORDER: 'Менеджер',
	       				MANAGER_PAYMENT_MONEY: 'ГРН',
	       				MANAGER_DESELECTED_REASON: 'Причина відміни замовлення',
	       				MANAGER_DESELECT_BT: 'Відмінити замовлення',
	       				MANAGER_PAYMENT_METHOD1: 'Готівка',
	       				MANAGER_PAYMENT_METHOD2: 'Карта ПриватБанку (термінал)',
	       				MANAGER_PAY_BT: 'Оплатити',
	       				MANAGER_ORDER_FILTER_ORDER: 'Введіть номер замовлення',
	       				MANAGER_ORDER_FILTER_USER: 'Прізвище, Ім’я, По Батькові',
	       				MANAGER_ORDER_RESET_FILTER_BT: 'Анулювати всі фільтри',
	       				MANAGER_ORDER_DATE: 'Дата замовлення',
	       				MANAGER_ORDER_ORDER_ERROR: ' Немає вільних місць',
	       				MAIN_MAP: 'адреса',











      };
	var translationsRU= {
	  //Index.html
	  SING_IN: 'Вход/Ргистрация',
	  MY_ORDERS: 'Мои заказы',
	  USER_SETTINGS: 'Настройки',
	  DO_ORDER: 'Получить заказ',
	  MANAGER_ORDER_LIST: 'Список заказов',
	  SING_OUT: 'Выход',
	  MAIN_PAGE_MAIN_MAP_HEADER: 'Местоположение комнаты',
	  ORDER_PAYMENT_FALSE_HEADER: 'Ошибка подтверждения оплаты',
	  CONTACT_MANAGER: 'Пожалуйста свяжитесь с менеджером +380685087802',
	  MAIN_ABOUT_US: 'ПРО НАС',
	  MAIN_CONTACT: 'КОНТАКТЫ',
	  MAIN_SOCIAL_MEDIA: 'МЫ В СОЦИАЛЬНЫХ СЕТЯХ',
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
	  			//room-detail.tpl
	  			ROOM_DETAIL_DESCRIPTION: 'Описание :',
	  			ROOM_DETAIL_BEDS: 'Кроватей в комнате :',
	  			ROOM_DETAIL_PRICE: 'Цена за койко-место :',
	  			ROOM_DETAIL_LOCATION: 'Местоположение комнаты :',
	  			ROOM_DETAIL_CHEK_FREE_PLACE: 'Заказать койко-место : ',
	  			ROOM_DETAIL_DATE_ARIVAL: 'Дата приезда :',
	  			ROOM_DETAIL_DATE_DISPATCH: 'Дата отьезда :',
	  			ROOM_DETAIL_ORDER_BT: 'Заказать',
	  			ROOM_DETAIL_ORDEROCCUP_BT: 'Нет мест, смотреть свободные места',
	  			ROOM_DETAIL_INTERVAL_BT: 'Пожалуйста, введите правильный интервал',
	  			//payment-confirm.tpl
	  			PAYMENT_CONFIRM_ORDER: 'Заказ',
	  			PAYMENT_CONFIRM_FROM: 'от',
	  			PAYMENT_DATE_ARRIVAL: 'Дата приезда:',
	  			PAYMENT_DATE_DEPARTURE: 'Дата отьезда:',
	  			PAYMENT_PHONE_NUMBER: 'Номер телефона:',
	  			PAYMENT_EMAIL: 'Эл. почта',
	  			PAYMENT_FIRST_NAME: 'Имя:',
	  			PAYMENT_MIDDLE_NAME: 'Фамилия:',
	  			PAYMENT_LAST_NAME: 'Отчество:',
	  			PAYMENT_AMMOUNT: 'Сумма :',
	  				//order-room.tpl
	  				ORDER_ORDER_FORM: 'Форма Заказа',
	  				ORDER_INP_DATE_ARIVAL: 'Дата приезда',
	  				ORDER_INP_DATE_DEPARTURE: 'Дата отьезда',
	  				ORDER_INP_EMAIL: 'Эл. почта',
	  				ORDER_BT_ORDER: 'Заказать Кровать',
	  					//additional-room.tpl.
	  					ADDITIONAL_ROOM_HEADER: 'Свободные кровати',
	  					ADDITIONAL_ROOM_WATCH: 'Перейти',
	  					ADDITIONAL_ROOM_PRICE: 'Цена за кровать :',
	  					REGISTRATION_INFO_HEADER: 'Пожалуйста, введите дополнительную информацию в профиль',
	  					REGISTRATION_INFO_HEADER2: 'С этим',
	  					REGISTRATION_INFO_HEADER3: 'легче',
	  					REGISTRATION_INFO_HEADER4: 'пользоваться нашими сервисами',
	  				//user-register.tpl.
	  				USER_REGISTER_WITH: 'Зарегестрироваться через :',
	  				USER_REGISTER_OR: 'или :',
	  				USER_REGISTER_PASSWORD1: 'Пароль',
	  				USER_REGISTER_PASSWORD_REPEAT: 'Пароль ещё раз',
	  				USER_SING_UP_BT: 'Зарегестрироваться',
	  				USER_REGISTER_REGISTRATION_SUCESS: 'Регистрация',
	  				USER_REGISTER_REGISTRATION1: 'прошла удачно',
	  				USER_REGISTER_CONFIRM_EMAIL: 'Пожалуйста, подтвердите адрес электронной почты, чтобы использовать все возможности сайта',
	  				USER_REGISTER_GO_TO_EMAIL: 'Перейти в почту',
	  				USER_REGISTER_ALREADY: 'Уже зарегистрированы?',
	  				USER_REGISTER_LOGIN: 'Вход',
	  				//login.tpl
	  				LOGIN_ERR_EMAIL: 'Неправильный формат електронной почты!',
	  				LOGIN_NOT_A_MEMBER: 'Вы не зарегистрированы?',
	  				USER_REGISTER_FORGOT: 'Забыли',
	  				USER_REGISTER_PASSWORD: 'Пароль?',
	  				//password-reset-confirmation.tpl
	  				PASSWORD_RESET_CONFIRMATION: 'Подтверждение сброса пароля',
	  				PASSWORD_RESET_BT_CHANGE: 'Изменить',
	  				PASSWORD_RESET_HEADER1: 'Пожалуйста укажите вашу Эл. почту',
	  				PASSWORD_RESET_HEADER2: 'для сброса пароля',
	  				PASSWORD_RESET_HEADER_SUCCESS: 'Пароль сброшен удачно',
	  				PASSWORD_RESET_CONFIRM_MESSAGE: 'Письмо с подтверждением отправлено',
	  				PASSWORD_RESET_BT: 'Сбросить пароль',
	  				//order-list.tpl
	  				ORDER_LIST_HEADER: 'Список заказов',
	  				ORDER_LIST_ORDER: 'Заказ',
	  				ORDER_LIST_ROOM: 'Комната',
	  				PERSON_FULL_NAME: 'Ф.И.О.',
	  				ORDER_PHONE: 'Телефон',
	  				ORDER_PAYMENT: 'Оплата',
	  				ORDER_NO_ORDERS: 'Заказы отсутствуют',
	  				//order-info.tpl
	  				ORDER_INFO_HEADER: 'Информация о заказе',
	  				ORDER_INFO_ADDRESS: 'Адрес',
	  				ORDER_PAYMENT_OK: 'Оплата зачислена',
	  				ORDER_PAYMENT_FALSE: 'Oплаты нет',
	  				//manager-main-page.tpl
	  				MANAGER_MAIN_PAGE_HEADER: 'Сделать заказ',
	  				MANAGER_ORDER_BOOKING: 'Забронировано',
	  				MANAGER_ORDER_DESELECTED: 'Отменен',
	  				MANAGER_PAYMENT_TYPE: 'Тип оплаты',
	  				MANAGER_PAYMENT_DATE: 'Дата оплаты',
	  				MANAGER_MANAGER_ORDER: 'Manager',
	  				MANAGER_PAYMENT_MONEY: 'ГРН',
	  				MANAGER_DESELECTED_REASON: ' Причина отмены заказы',
	  				MANAGER_DESELECT_BT: 'Отменить заказ',
	  				MANAGER_PAYMENT_METHOD1: 'Наличные',
	  				MANAGER_PAYMENT_METHOD2: 'Карта ПриватБанка (терминал)',
	  				MANAGER_PAY_BT: 'Оплатить',
	  				MANAGER_ORDER_FILTER_ORDER: 'Введите номер заказа',
	  				MANAGER_ORDER_FILTER_USER: 'Имя, Фамилия, Отчество',
	  				MANAGER_ORDER_RESET_FILTER_BT: 'Анулировать все фильтра',
	  				MANAGER_ORDER_DATE: 'Дата заказа',
	  				MANAGER_ORDER_ORDER_ERROR: 'Нет свободных мест',
	  				MAIN_MAP: 'адрес',














	
	 
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


})();