#!/usr/bin/env python
# encoding: utf-8

from django.urls import path
from django.views.generic.base import TemplateView

from . import views


app_name = 'trips'

urlpatterns = [
    path('', views.home, name='home'),
    path('o-mnie', views.AboutMeTemplateView.as_view(), name='about_me'),
    path('podroze', views.get_trips, name='trips'),
    path('podroze/<int:trip_id>', views.get_trip, name='trip'),
    path('statistics', views.get_statistics, name='statistics'),
    path('photo-manager', TemplateView.as_view(
        template_name='photos/index.html'), name='photo_manager'),

    path('api/trips', views.api_trips, name='api_trips')
]
