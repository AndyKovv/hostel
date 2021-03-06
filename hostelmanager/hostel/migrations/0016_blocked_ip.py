# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-05 21:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0015_auto_20160505_1244'),
    ]

    operations = [
        migrations.CreateModel(
            name='Blocked_Ip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.GenericIPAddressField(unpack_ipv4=True)),
                ('block_time_in', models.DateTimeField(auto_now_add=True)),
                ('block_time_out', models.DateTimeField(auto_now_add=True)),
                ('block_forever', models.BooleanField(default=False)),
            ],
        ),
    ]
