# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-15 19:42
from __future__ import unicode_literals

from django.db import migrations
import image_cropping.fields


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0008_auto_20160315_1924'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomimage',
            name='image_standard',
            field=image_cropping.fields.ImageCropField(upload_to='/var/www/hostel.te.ua/project/media/roomimage/'),
        ),
    ]
