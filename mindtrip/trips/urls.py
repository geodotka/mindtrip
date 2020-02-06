#!/usr/bin/env python
# encoding: utf-8

from django.urls import path

from . import views


app_name = 'trips'

urlpatterns = [
    path('', views.home, name='home'),
    path('o-mnie', views.AboutMeTemplateView.as_view(), name='about_me'),
    path('podroze', views.get_trips, name='trips'),
    path('podroze/<int:trip_id>', views.get_trip, name='trip'),
    path('statistics', views.get_statistics, name='statistics'),
]
