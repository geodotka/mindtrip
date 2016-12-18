#!/usr/bin/env python
# encoding: utf-8

from __builtin__ import super

from django.db import models
from mindtrip.trips.helpers import slugify


class Trip(models.Model):
    destination = models.CharField(max_length=255, verbose_name=u'Cel podróży')
    summary = models.TextField(verbose_name=u'Podsumowanie')
    start_at = models.DateField(verbose_name=u'Data początku')
    end_at = models.DateField(verbose_name=u'Data końca')
    hotel = models.CharField(max_length=500, verbose_name=u'Noclegi')
    hotel_price = models.CharField(
        max_length=255, verbose_name=u'Cena noclegów')
    travel = models.CharField(max_length=500, verbose_name=u'Dojazd')
    travel_price = models.CharField(
        max_length=255, verbose_name=u'Cena noclegów')
    tips = models.TextField(blank=True, null=True, verbose_name=u'Wskazówki')

    tags = models.ManyToManyField('Tag', verbose_name=u'Tagi')

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


class Tag(models.Model):
    name = models.CharField(unique=True, max_length=255, verbose_name=u'Nazwa')
    slug = models.CharField(max_length=255, verbose_name=u'Slug')

    class Meta:
        verbose_name = u'Tag'
        verbose_name_plural = u'Tagi'

    def __unicode__(self):
        return self.name

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Tag, self).save(
            force_insert=force_insert, force_update=force_update,
            using=using, update_fields=update_fields)
