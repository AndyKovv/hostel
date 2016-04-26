import datetime

from django_cron import CronJobBase, Schedule
from django.utils import timezone
from django.core.mail import send_mail
from django.template.loader import render_to_string, get_template
from hostel.models import ExtUser, Order
from django.core.mail import EmailMultiAlternatives
from django.template import Context


class UnpaymentOrder(CronJobBase):
    RUN_EVERY_MINS = 5 # every 2 hours
    RETRY_AFTER_FAILURE_MINS = 2

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS, retry_after_failure_mins=RETRY_AFTER_FAILURE_MINS)
    code = 'my_app.my_cron_job'    # a unique code

    def do(self):
    	#Disablend non payment order
    	disabled_orders = Order.objects.filter(
    		is_booking=True,
    		payment=False,
    		order_time_out__lte=timezone.now()).exclude(user__is_manager=True)
    	if  disabled_orders.count() > 0:
    		for disabled_order in disabled_orders:
    			disabled_order.is_booking = False
    			disabled_order.save()
    		print('ok');

    	print('Non orders')


class DailyTimeTable(CronJobBase):
	RUN_EVERY_MINS = 5
	RUN_AT_TIMES = ['5:00']
	

	schedule = Schedule(run_every_mins=RUN_EVERY_MINS, run_at_times=RUN_AT_TIMES)
	code = 'Daily_Time_Table_cron_task_main'

	def do(self):
		today_date = timezone.now().date()
		peoples_in = Order.objects.filter(payment=True, date_in=today_date)
		peoples_out = Order.objects.filter(payment=True, date_out=today_date)
		temp_html = get_template('templated_email/daily_time_table.html')
		d = Context({'peoples_in' : peoples_in, 'peoples_out' : peoples_out,})
		subject, from_email, to = 'Daily Time Table', 'timetable_manager@hostel.te.ua', 'manager-room@hostel.te.ua'
		html_content = temp_html.render(d)
		msg = EmailMultiAlternatives(subject, 'text mess', from_email, [to])
		msg.attach_alternative(html_content, "text/html") 
		msg.send()
		print('email send ok')
		