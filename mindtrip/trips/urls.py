#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^o-mnie$', views.AboutMeTemplateView.as_view(), name='about_me'),
    url(r'^podroze$', views.get_trips, name='trips'),
    url(r'^podroze/(?P<trip_id>\d+)$', views.get_trip, name='trip'),
    url(r'^statistics$', views.get_statistics, name='statistics'),
]
