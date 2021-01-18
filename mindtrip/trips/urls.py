#!/usr/bin/env python
# encoding: utf-8

from django.urls import path
from django.views.generic import TemplateView

from . import views


app_name = 'trips'

urlpatterns = [
    path('', TemplateView.as_view(template_name='home/index.html'),
         name='home'),
    path('o-mnie', views.AboutMeTemplateView.as_view(), name='about_me'),
    path('podroze', views.get_trips, name='trips'),
    path('podroze/<int:trip_id>', views.get_trip, name='trip'),
    path('statistics', views.get_statistics, name='statistics'),
    path('photo-manager', views.PhotoManagerTemplateView.as_view(),
         name='photo_manager'),
    path('tagi/<slug:slug>', views.get_trips_by_tag, name='tag'),

    path('api/trips', views.api_trips, name='api_trips'),
    path('api/trips/<int:trip_id>/<int:day_id>/save', views.api_save_trip,
         name='api_save_trip'),
    path('api/trips/<int:trip_id>/<int:day_id>/old-photos',
         views.api_get_old_trip_photos, name='api_get_old_trip_photos'),
    path('api/trips_gallery', views.api_trips_gallery,
         name='api_trips_gallery'),
    path('api/news', views.api_news, name='api_news'),
]
