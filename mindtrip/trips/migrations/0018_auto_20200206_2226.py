# Generated by Django 3.0.3 on 2020-02-06 21:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0017_auto_20180708_2317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='trip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='trips.Trip', verbose_name='Wycieczka'),
        ),
    ]
