# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-07 11:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0004_auto_20160407_1013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomimage',
            name='image_original',
            field=models.ImageField(max_length=255, upload_to='//', verbose_name='original file upload'),
        ),
    ]