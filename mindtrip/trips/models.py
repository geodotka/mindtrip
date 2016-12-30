#!/usr/bin/env python
# encoding: utf-8

import os

from django.db import models

from .helpers import slugify


def upload_to(instance, filename):
    parts = [
        str(instance.id),
        filename,
    ]
    return os.sep.join(parts)


class Trip(models.Model):
    destination = models.CharField(max_length=255, verbose_name=u'Cel podróży')
    picture = models.ImageField(upload_to=upload_to, null=True, blank=True)
    country = models.ForeignKey('Country', verbose_name=u'Kraj')
    summary = models.TextField(verbose_name=u'Podsumowanie')
    start_at = models.DateField(verbose_name=u'Data początku')
    end_at = models.DateField(verbose_name=u'Data końca')
    hotel = models.CharField(max_length=500, verbose_name=u'Noclegi')
    hotel_price = models.CharField(
        max_length=255, verbose_name=u'Cena noclegów')
    travel = models.CharField(max_length=500, verbose_name=u'Dojazd')
    travel_price = models.CharField(
        max_length=255, verbose_name=u'Cena dojazdu')
    tips = models.TextField(blank=True, null=True, verbose_name=u'Wskazówki')

    tags = models.ManyToManyField('Tag', blank=True, verbose_name=u'Tagi')

    class Meta:
        verbose_name = u'Wycieczka'
        verbose_name_plural = u'Wycieczki'

    def __unicode__(self):
        return u'{0}: {1} - {2}'.format(
            self.destination, self.start_at, self.end_at)


class Day(models.Model):
    name = models.CharField(
        blank=True, null=True, max_length=255, verbose_name=u'Nazwa')
    date = models.DateField(verbose_name=u'Data')
    description = models.TextField(verbose_name=u'Opis')
    tips = models.TextField(blank=True, null=True, verbose_name=u'Wskazówki')
    trip = models.ForeignKey(
        Trip, verbose_name=u'Wycieczka', related_name='days')

    class Meta:
        verbose_name = u'Dzień'
        verbose_name_plural = u'Dni'

    def __unicode__(self):
        return u'{0} ({1})'.format(self.trip, self.date)


class SlugifyModel(models.Model):
    name = models.CharField(unique=True, max_length=255, verbose_name=u'Nazwa')
    slug = models.CharField(max_length=255, blank=True, verbose_name=u'Slug')

    class Meta:
        abstract = True

    def __unicode__(self):
        return self.name

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if not self.slug:
            self.slug = slugify(self.name)
        super(SlugifyModel, self).save(
            force_insert=force_insert, force_update=force_update,
            using=using, update_fields=update_fields)


class Tag(SlugifyModel):

    class Meta:
        abstract = False
        verbose_name = u'Tag'
        verbose_name_plural = u'Tagi'


class Country(SlugifyModel):

    class Meta:
        abstract = False
        verbose_name = u'Kraj'
        verbose_name_plural = u'Kraje'
