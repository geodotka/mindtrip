#!/usr/bin/env python
# encoding: utf-8

import os
from PIL import Image
import StringIO

from django.db import models

from .helpers import slugify


def upload_to(instance, filename):
    if instance.id:
        instance_id = instance.id
    else:
        trip = Trip.objects.all().last()
        if trip is not None:
            instance_id = trip.id + 1
        else:
            instance_id = 1
    return os.sep.join([str(instance_id), filename])


def photo_upload_to(instance, filename):
    return os.sep.join(
        [str(instance.trip_day.trip_id), str(instance.trip_day_id), filename])


class Trip(models.Model):
    destination = models.CharField(max_length=255, verbose_name=u'Cel podróży')
    picture = models.ImageField(upload_to=upload_to, null=True, blank=True)
    country = models.ManyToManyField(
        'Country', verbose_name=u'Kraj', related_name='trips')
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
    views_counter = models.IntegerField(
        default=0, verbose_name=u'Licznik odwiedzin')
    guidebook = models.CharField(
        max_length=500, null=True, blank=True, verbose_name=u'Przewodniki/mapy')
    planned_at = models.CharField(
        max_length=500, null=True, blank=True, verbose_name=u'Planowana w')
    is_complete = models.BooleanField(default=False, verbose_name=u'Gotowa')
    describe_capital = models.BooleanField(
        default=False, verbose_name=u'Opisuje stolicę')

    tags = models.ManyToManyField('Tag', blank=True, verbose_name=u'Tagi')

    class Meta:
        verbose_name = u'Wycieczka'
        verbose_name_plural = u'Wycieczki'
        ordering = ['start_at', ]

    def __unicode__(self):
        return u'{0}: {1} - {2}'.format(
            self.destination, self.start_at, self.end_at)

    @property
    def dates(self):
        if self.start_at == self.end_at:
            return self.start_at.strftime('%d.%m.%Y')
        return u'{} - {}'.format(self.start_at.strftime('%d.%m.%Y'),
                                 self.end_at.strftime('%d.%m.%Y'))

    def get_photo_list_for_gallery(self):
        photos = Photo.objects.filter(
            trip_day__trip_id=self.id).order_by('trip_day', 'id')
        return [photo.get_data_for_trip_gallery() for photo in photos]


class Day(models.Model):
    name = models.CharField(
        blank=True, null=True, max_length=255, verbose_name=u'Nazwa')
    date = models.DateField(blank=True, null=True, verbose_name=u'Data')
    description = models.TextField(verbose_name=u'Opis')
    tips = models.TextField(blank=True, null=True, verbose_name=u'Wskazówki')
    trip = models.ForeignKey(
        Trip, verbose_name=u'Wycieczka', related_name='days')

    class Meta:
        verbose_name = u'Dzień'
        verbose_name_plural = u'Dni'

    def __unicode__(self):
        return u'{0} - {1} ({2})'.format(
            self.trip.destination, self.name, self.date)


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

    @property
    def sorted_posts(self):
        return self.posts.order_by('destination')


class Photo(models.Model):
    photo = models.ImageField(
        upload_to=photo_upload_to, verbose_name=u'Zdjęcie')
    trip_day = models.ForeignKey(
        Day, verbose_name=u'Dzień wycieczki', related_name='photos')
    description = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=u'Opis')

    class Meta:
        verbose_name = u'Zdjęcie'
        verbose_name_plural = u'Zdjęcia'

    def __unicode__(self):
        return u'{0} ({1})'.format(self.trip_day, self.photo.url)

    def get_data_for_trip_gallery(self):
        return {
            'url': self.photo.url,
            'trip_day': self.trip_day.name,
            'description': self.description,
        }

    def save(self, *args, **kwargs):
        if self.photo:
            if self.photo.width > 400 or self.photo.height > 300:
                if self.photo.width > self.photo.height:
                    size = (400, 300)
                else:
                    size = (300, 400)
                image = Image.open(self.photo.file)
                self.save_photo(image, size)
                image.close()
        return super(Photo, self).save(*args, **kwargs)

    def save_photo(self, image, size):
        image_file = StringIO.StringIO()
        image.thumbnail(size)
        image.save(image_file, 'JPEG')
        self.photo.file = image_file


class News(models.Model):
    title = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=u'Tytył')
    text = models.TextField(verbose_name=u'Tekst')
    created_at = models.DateField(verbose_name=u'Data wpisu')

    class Meta:
        verbose_name = u'Wpis'
        verbose_name_plural = u'Wpisy'

    def __unicode__(self):
        return u'{} {}'.format(self.created_at.strftime('%F'), self.title)


class Post(models.Model):
    author = models.CharField(max_length=255, verbose_name=u'Autor')
    trip = models.ForeignKey(
        Trip, verbose_name='Wycieczka', related_name='posts')
    content = models.TextField(verbose_name=u'Treść')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name=u'Utworzony')

    class Meta:
        verbose_name = u'Komentarz'
        verbose_name_plural = u'Komentarze'

    def __unicode__(self):
        return u'{0} - {1}'.format(self.id, self.author)
