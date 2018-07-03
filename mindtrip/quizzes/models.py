#!/usr/bin/env python
# encoding: utf-8

import os

from django.db import models


def photo_upload_to(instance, filename):
    return os.sep.join(
        ['quizzes', str(instance.quiz_id), filename])


class Quiz(models.Model):
    name = models.CharField(max_length=255, verbose_name=u'Nazwa')
    short = models.CharField(max_length=255, verbose_name=u'Skrót')
    description = models.TextField(verbose_name=u'Opis')
    added_at = models.DateField(verbose_name=u'Data dodania')

    class Meta:
        verbose_name = u'Konkurs'
        verbose_name_plural = u'Konkursy'

    def __unicode__(self):
        return self.name


class Photo(models.Model):
    photo = models.ImageField(
        upload_to=photo_upload_to, verbose_name=u'Zdjęcie')
    quiz = models.ForeignKey(
        Quiz, verbose_name=u'Quiz', related_name='photos')
    description = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=u'Opis')

    class Meta:
        verbose_name = u'Zdjęcie'
        verbose_name_plural = u'Zdjęcia'

    def __unicode__(self):
        return u'{0} ({1})'.format(self.quiz, self.photo.url)
