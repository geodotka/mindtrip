# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-07 18:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0010_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trips', to='trips.Country', verbose_name='Kraj'),
        ),
    ]
