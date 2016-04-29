import django_filters
from hostel.models import Order
from rest_framework import filters

class ManagerFilter(filters.FilterSet):
	id = django_filters.NumberFilter(name='id', lookup_type='exact')
	date_in = django_filters.DateFromToRangeFilter()
	
	class Meta:
		model = Order
		fields = ['id', 'date_in', ]