#!/usr/bin/env python
# encoding: utf-8

from django.db import models


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
