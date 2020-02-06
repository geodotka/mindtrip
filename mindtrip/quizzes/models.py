#!/usr/bin/env python
# encoding: utf-8

import os

from django.db import models


def photo_upload_to(instance, filename):
    return os.sep.join(
        ['quizzes', str(instance.quiz_id), filename])


class Quiz(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nazwa')
    short = models.CharField(max_length=255, verbose_name='Skrót')
    description = models.TextField(verbose_name='Opis')
    added_at = models.DateField(verbose_name='Data dodania')

    class Meta:
        verbose_name = 'Konkurs'
        verbose_name_plural = 'Konkursy'

    def __str__(self):
        return self.name


class Photo(models.Model):
    photo = models.ImageField(
        upload_to=photo_upload_to, verbose_name='Zdjęcie')
    quiz = models.ForeignKey(
        Quiz, verbose_name='Quiz', related_name='photos',
        on_delete=models.CASCADE)
    description = models.CharField(
        max_length=255, null=True, blank=True, verbose_name='Opis')

    class Meta:
        verbose_name = 'Zdjęcie'
        verbose_name_plural = 'Zdjęcia'

    def __str__(self):
        return '{0} ({1})'.format(self.quiz, self.photo.url)
