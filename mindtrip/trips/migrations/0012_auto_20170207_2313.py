# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-07 22:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0011_auto_20170107_1940'),
    ]

    operations = [
        migrations.AlterField(
            model_name='day',
            name='date',
            field=models.DateField(blank=True, null=True, verbose_name='Data'),
        ),
    ]