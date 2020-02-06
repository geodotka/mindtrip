#!/usr/bin/env python
# encoding: utf-8

from django.urls import path
from django.views.generic.base import TemplateView

from . import views


app_name = 'quizzes'

urlpatterns = [
    path('quizy', views.get_quizzes, name='quizzes'),
    path('quizy/<int:quiz_id>', views.get_quiz, name='quiz'),
    path('quizy/gwara',
         TemplateView.as_view(template_name='quizzes/gwara.html')),
]
