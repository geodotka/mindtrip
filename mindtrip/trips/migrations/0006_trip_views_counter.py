# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-03 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0005_trip_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='views_counter',
            field=models.IntegerField(default=0, verbose_name='Licznik odwiedzin'),
        ),
    ]
