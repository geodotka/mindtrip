#!/usr/bin/env python
# encoding: utf-8

from django.conf.urls import url
from django.views.generic.base import TemplateView

from . import views


urlpatterns = [
    url(r'^quizy$', views.get_quizzes, name='quizzes'),
    url(r'^quizy/(?P<quiz_id>\d+)$', views.get_quiz, name='quiz'),
    url(r'^quizy/gwara$',
        TemplateView.as_view(template_name='quizzes/gwara.html')),
]
