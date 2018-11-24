#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^origami$', views.index, name='origami'),
    url(r'^origami$/(?P<item_id>\d+)$', views.get_item, name='origami_item'),
]
