# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-05-01 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0012_auto_20170207_2313'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='is_complete',
            field=models.BooleanField(default=False, verbose_name='Gotowa'),
        ),
    ]
