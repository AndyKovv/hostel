# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-19 10:05
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0007_auto_20160418_1259'),
    ]

    operations = [
        migrations.CreateModel(
            name='TransactionPrivat24',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('signature', models.CharField(max_length=100)),
                ('amt', models.FloatField()),
                ('ccy', models.CharField(max_length=4)),
                ('details', models.CharField(max_length=40)),
                ('ext_details', models.CharField(max_length=40)),
                ('pay_way', models.CharField(max_length=10)),
                ('merchant', models.IntegerField()),
                ('state', models.CharField(max_length=6)),
                ('date', models.DateTimeField()),
                ('ref', models.CharField(max_length=50)),
                ('payCountry', models.CharField(max_length=10)),
            ],
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='transactionprivat24',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_id', to='hostel.Order'),
        ),
    ]
