# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2018-07-03 17:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import mindtrip.quizzes.models


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to=mindtrip.quizzes.models.photo_upload_to, verbose_name='Zdj\u0119cie')),
                ('description', models.CharField(blank=True, max_length=255, null=True, verbose_name='Opis')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='quizzes.Quiz', verbose_name='Quiz')),
            ],
            options={
                'verbose_name': 'Zdj\u0119cie',
                'verbose_name_plural': 'Zdj\u0119cia',
            },
        ),
    ]