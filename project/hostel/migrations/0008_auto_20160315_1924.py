# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-15 19:24
from __future__ import unicode_literals

from django.db import migrations, models
import image_cropping.fields


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0007_auto_20160315_1845'),
    ]

    operations = [
        migrations.AddField(
            model_name='roomimage',
            name='cropping',
            field=image_cropping.fields.ImageRatioField('image_standard', '570x380', adapt_rotation=False, allow_fullsize=False, free_crop=False, help_text=None, hide_image_field=False, size_warning=False, verbose_name='cropping'),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_time_out',
            field=models.DateTimeField(),
        ),
    ]