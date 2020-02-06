# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-06 22:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0009_auto_20170106_2009'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=255, verbose_name='Autor')),
                ('content', models.TextField(verbose_name='Tre\u015b\u0107')),
                ('created_at', models.DateField(auto_now_add=True, verbose_name='Utworzony')),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='trips.Trip', verbose_name=b'Wycieczka')),
            ],
            options={
                'verbose_name': 'Komentarz',
                'verbose_name_plural': 'Komentarze',
            },
        ),
    ]
