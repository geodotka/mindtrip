# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2018-06-18 19:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0015_auto_20180501_0049'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='country',
        ),
        migrations.AddField(
            model_name='trip',
            name='country',
            field=models.ManyToManyField(related_name='trips', to='trips.Country', verbose_name='Kraj'),
        ),
    ]
