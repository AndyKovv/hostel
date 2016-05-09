"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 1.9.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'q)35vtcyvkux@g^*5kqt=%z3&x82xmz41yy2vyrge%c71)+kf3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['www.hostel.te.ua']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.vk',
    'allauth.socialaccount.providers.facebook',
    'rest_framework',
    'rest_framework.authtoken',
    'hostel',
    'geoposition',
    'django_cron',
    
   



]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ADMINS = [('Andy', 'andy.kovv@gmail.com'), ('Admin', 'admin@hostel.te.ua')]

CRON_CLASSES = [
    'hostel.cronjobs.UnpaymentOrder',
    'hostel.cronjobs.DailyTimeTable',    
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
    )

ROOT_URLCONF = 'hostelmanager.urls'


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='smtp.zoho.com'
EMAIL_PORT=587
EMAIL_HOST_USER = 'admin@hostel.te.ua'
EMAIL_HOST_PASSWORD = 'Lmk87868@'
DEFAULT_FROM_EMAIL = 'admin@hostel.te.ua'
EMAIL_USE_TLS = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [

                
                '/home/AndyKovv/hostelmanager/hostel/templates/',
                '/home/AndyKovv/hostelmanager/hostel/templates/hostel/',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
	    


WSGI_APPLICATION = 'hostelmanager.wsgi.application'


# Database
# https://docs.djangohostelmanager.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'AndyKovv$hostel',
        'USER': 'AndyKovv',
        'PASSWORD': 'A668Gi88@',
        'HOST': 'AndyKovv.mysql.pythonanywhere-services.com',
        
        
    }
}
    
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/home/AndyKovv/hostelmanager/cache',
        'TIMEOUT': 60,
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    }
}


# Password validation
# https://docs.djangohostelmanager.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangohostelmanager.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'hostel.ExtUser'

# Static files (CSS, JavaScript, Images)
# https://docs.djangohostelmanager.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/home/AndyKovv/hostelmanager/static/'

MEDIA_ROOT = '/home/AndyKovv/hostelmanager/media/roomimage/'
#MEDIA_URL = '/var/www/hostel.te.ua/hostelmanager/media/roomimage/'


REST_SESSION_LOGIN = True

SITE_ID = 4
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'optional'
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False
LOGIN_REDIRECT_URL = '/'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '2000/day',
        'user': '1000/day'
    }
}
    
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,

    'filters': {
    'require_debug_false': {
        '()': 'django.utils.log.RequireDebugFalse',
        }
    },
    'formatters': {
        'verbose': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'mail_admins_error': {
        'level': 'ERROR',
        'filters': ['require_debug_false'],
        'class': 'django.utils.log.AdminEmailHandler',
        'include_html': True
        },
        'mail_admins_warning':{
        'level': 'WARNING',
        'filters': ['require_debug_false'],
        'class': 'django.utils.log.AdminEmailHandler',
        'include_html': True
        },
     },
    'loggers': {
       'django.request': {
            'handlers': ['mail_admins_error'],
            'level': 'ERROR',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['mail_admins_warning'],
            'level': 'WARNING',
            'propagate': False,
        },
      
    }
}




