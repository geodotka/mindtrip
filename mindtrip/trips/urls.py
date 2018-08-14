#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url
from django.views.generic.base import TemplateView

from . import views


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^o-mnie$', TemplateView.as_view(template_name='trips/about_me.html'),
        name='about_me'),
    url(r'^podroze$', views.get_trips, name='trips'),
    url(r'^podroze/(?P<trip_id>\d+)$', views.get_trip, name='trip'),
    url(r'^statistics$', views.get_statistics, name='trips'),
]
