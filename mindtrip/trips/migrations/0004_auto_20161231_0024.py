# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-30 23:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0003_auto_20161231_0016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='slug',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slug'),
        ),
        migrations.AlterField(
            model_name='tag',
            name='slug',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slug'),
        ),
    ]