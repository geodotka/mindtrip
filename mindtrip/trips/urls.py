#!/usr/bin/env python
# encoding: utf-8
from django.conf import settings

from django.conf.urls import url

from . import views
from django.conf.urls.static import static


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^kontakt$', views.contact, name='contact'),
    url(r'^podroze/(?P<trip_id>\d+)$', views.trip, name='trip'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
