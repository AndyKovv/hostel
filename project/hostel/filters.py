import django_filters
from hostel.models import Order
from rest_framework import filters

class ManagerFilter(filters.FilterSet):
	id = django_filters.NumberFilter(name='id', lookup_type='exact')
	class Meta:
		model = Order
		fields = ['id', ]