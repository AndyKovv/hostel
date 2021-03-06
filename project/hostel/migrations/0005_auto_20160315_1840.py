# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-15 18:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0004_auto_20160315_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_time_out',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='roomimage',
            name='image_main',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='roomimage',
            name='image_standard',
            field=models.ImageField(upload_to='/var/www/hostel.te.ua/project/media/roomimage/'),
        ),
    ]
