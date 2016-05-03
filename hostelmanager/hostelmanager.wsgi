import os,sys

apache_configuration = os.path.dirname(__file__)
project = os.path.dirname(apache_configuration)

sys.path.insert(0,'/home/hostelte/domains/hostel.te.ua/django/hostelmanager/')
sys.path.insert(0,'/home/hostelte/domains/hostel.te.ua/django/hostelmanager/hostelmanager/')
sys.path.insert(0,'/home/hostelte/virtualenv/hostelmanager/')
sys.path.insert(0,'/home/hostelte/domains/hostel.te.ua/django')
sys.path.insert(0,'/home/hostelte/virtualenv/hostelmanager/lib/python3.4/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'hostelmanager.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()