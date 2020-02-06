# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2018-04-30 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0014_auto_20170705_2333'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trip',
            options={'ordering': ['start_at'], 'verbose_name': 'Wycieczka', 'verbose_name_plural': 'Wycieczki'},
        ),
        migrations.AddField(
            model_name='trip',
            name='describe_capitol',
            field=models.BooleanField(default=False, verbose_name='Opisuje stolic\u0119'),
        ),
    ]
