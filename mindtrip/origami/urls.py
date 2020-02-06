#!/usr/bin/env python
# encoding: utf-8

from django.urls import path

from . import views


app_name = 'origami'

urlpatterns = [
    path('origami', views.index, name='origami'),
    path('origami/(?P<item_id>\d+)', views.get_item, name='origami_item'),
]
