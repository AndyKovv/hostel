# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-15 11:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0005_auto_20160407_1156'),
    ]

    operations = [
        migrations.AddField(
            model_name='extuser',
            name='inner_reg',
            field=models.BooleanField(default=False, verbose_name='Inner Reister'),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='email',
            field=models.EmailField(db_index=True, max_length=100, unique=True, verbose_name='email'),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='phone_number',
            field=models.CharField(max_length=16, verbose_name='Phone Number'),
        ),
        migrations.AlterField(
            model_name='roomimage',
            name='image_original',
            field=models.ImageField(max_length=255, upload_to='/', verbose_name='original file upload'),
        ),
    ]
