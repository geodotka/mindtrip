#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.get_quizzes, name='quizzes'),
    url(r'^/(?P<quiz_id>\d+)$', views.get_quiz, name='quiz'),
]
