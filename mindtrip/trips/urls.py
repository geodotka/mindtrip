#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^kontakt$', views.contact, name='contact'),
    url(r'^podroze/(?P<trip_id>\d+)$', views.trip, name='trip'),
]
