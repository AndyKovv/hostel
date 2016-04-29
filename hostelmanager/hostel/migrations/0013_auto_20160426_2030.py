# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-26 20:30
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0012_auto_20160426_0947'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdditionalPayment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amt', models.FloatField()),
                ('ccy', models.CharField(default='UAH', max_length=4)),
                ('details', models.CharField(max_length=40)),
                ('ext_details', models.CharField(max_length=40, null=True)),
                ('pay_way', models.CharField(max_length=10)),
                ('state', models.CharField(max_length=6)),
                ('date_time', models.DateTimeField()),
                ('ref', models.CharField(max_length=50)),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='manager', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_id',
            field=models.IntegerField(default='0'),
        ),
        migrations.AddField(
            model_name='additionalpayment',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostel.Order'),
        ),
    ]
