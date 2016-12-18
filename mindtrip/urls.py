#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^geodotka/', admin.site.urls),

    url(r'^', include('mindtrip.trips.urls')),
]
