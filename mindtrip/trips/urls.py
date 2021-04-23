#!/usr/bin/env python
# encoding: utf-8

from django.urls import include, path, re_path
from django.views.generic import TemplateView

from . import views


app_name = 'trips'

urlpatterns = [
    path('api/', include([
        path('trips', views.api_trips, name='api_trips'),
        path('trips/<int:trip_id>', views.api_trip, name='api_trip'),
        path('trips/<int:trip_id>/<int:day_id>/save', views.api_save_trip,
             name='api_save_trip'),
        path('trips/<int:trip_id>/<int:day_id>/old-photos',
             views.api_get_old_trip_photos, name='api_get_old_trip_photos'),
        path('trips_gallery', views.api_trips_gallery,
             name='api_trips_gallery'),
        path('news', views.api_news, name='api_news'),
        path('about_me', views.api_about_me, name='api_about_me'),
    ])),
    path('statistics', views.get_statistics, name='statistics'),
    path('photos-manager', views.PhotosManagerTemplateView.as_view(),
         name='photos_manager'),
    re_path(r'', TemplateView.as_view(template_name='trips/index.html'),
            name='home'),
]
