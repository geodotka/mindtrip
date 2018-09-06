#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url

from . import views
from django.views.generic.base import TemplateView


urlpatterns = [
    url(r'^quizy$', views.get_quizzes, name='quizzes'),
    url(r'^quizy/(?P<quiz_id>\d+)$', views.get_quiz, name='quiz'),
    url(r'^tastiera$', TemplateView.as_view(template_name='quizzes/keyboard.html'), name='keyboard'),
]
