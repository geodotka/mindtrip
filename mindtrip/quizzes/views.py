#!/usr/bin/env python
# encoding: utf-8

from annoying.decorators import render_to
from django.shortcuts import get_object_or_404

from .models import Quiz


@render_to('quizzes/quizzes.html')
def get_quizzes(request):
    return {'quizzes': Quiz.objects.all().order_by('added_at')}


@render_to('quizzes/quiz.html')
def get_quiz(request, quiz_id):
    return {'quiz': get_object_or_404(Quiz, id=quiz_id)}
