# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-06 11:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0016_blocked_ip'),
    ]

    operations = [
        migrations.AddField(
            model_name='blocked_ip',
            name='catch_times',
            field=models.IntegerField(default='0'),
            preserve_default=False,
        ),
    ]
