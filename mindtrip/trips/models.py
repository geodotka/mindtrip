#!/usr/bin/env python
# encoding: utf-8

import os
from PIL import Image
from io import StringIO

from annoying.fields import JSONField
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
    destination = models.CharField(max_length=255, verbose_name='Cel podróży')
    picture = models.ImageField(upload_to=upload_to, null=True, blank=True)
    country = models.ManyToManyField(
        'Country', verbose_name='Kraj', related_name='trips')
    summary = models.TextField(verbose_name='Podsumowanie')
    start_at = models.DateField(verbose_name='Data początku')
    end_at = models.DateField(verbose_name='Data końca')
    hotel = models.CharField(max_length=500, verbose_name='Noclegi')
    hotel_price = models.CharField(
        max_length=255, verbose_name='Cena noclegów')
    travel = models.CharField(max_length=500, verbose_name='Dojazd')
    travel_price = models.CharField(
        max_length=255, verbose_name='Cena dojazdu')
    tips = models.TextField(blank=True, null=True, verbose_name='Wskazówki')
    views_counter = models.IntegerField(
        default=0, verbose_name='Licznik odwiedzin')
    guidebook = models.CharField(
        max_length=500, null=True, blank=True, verbose_name='Przewodniki/mapy')
    planned_at = models.CharField(
        max_length=500, null=True, blank=True, verbose_name='Planowana w')
    is_complete = models.BooleanField(default=False, verbose_name='Gotowa')
    describe_capital = models.BooleanField(
        default=False, verbose_name='Opisuje stolicę')

    tags = models.ManyToManyField('Tag', blank=True, verbose_name='Tagi')

    class Meta:
        verbose_name = 'Wycieczka'
        verbose_name_plural = 'Wycieczki'
        ordering = ['start_at', ]

    def __str__(self):
        return '{0}: {1} - {2}'.format(
            self.destination, self.start_at, self.end_at)

    @property
    def dates(self):
        if self.start_at == self.end_at:
            return self.start_at.strftime('%d.%m.%Y')
        return '{} - {}'.format(self.start_at.strftime('%d.%m.%Y'),
                                 self.end_at.strftime('%d.%m.%Y'))

    def get_photo_list_for_gallery(self):
        photos = Photo.objects.filter(
            trip_day__trip_id=self.id).order_by('trip_day', 'id')
        return [photo.get_data_for_trip_gallery() for photo in photos]

    def to_dict(self):
        return {
            'id': self.id,
            'destination': self.destination,
            'country': self.countries,
            'picture': self.picture.url if self.picture else '',
            'startAt': self.start_at.strftime('%d.%m.%Y'),
            'endAt': self.end_at.strftime('%d.%m.%Y'),
            'days': [day.to_dict() for day in self.days.all().order_by('id')],
        }

    @property
    def countries(self):
        countries = self.country.all()
        if len(countries) == 1:
            return countries[0].name
        return ', '.join([c.name for c in countries]),


class Day(models.Model):
    name = models.CharField(
        blank=True, null=True, max_length=255, verbose_name='Nazwa')
    date = models.DateField(blank=True, null=True, verbose_name='Data')
    description = models.TextField(verbose_name='Opis')
    tips = models.TextField(blank=True, null=True, verbose_name='Wskazówki')
    trip = models.ForeignKey(
        Trip, verbose_name='Wycieczka', related_name='days',
        on_delete=models.CASCADE)
    photos_json = JSONField(null=True, blank=True)

    class Meta:
        verbose_name = 'Dzień'
        verbose_name_plural = 'Dni'

    def __str__(self):
        return '{0} - {1} ({2})'.format(
            self.trip.destination, self.name, self.date)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date.strftime('%d.%m.%Y') if self.date else '',
            'photos': self.photos_json or [],
        }


class SlugifyModel(models.Model):
    name = models.CharField(unique=True, max_length=255, verbose_name='Nazwa')
    slug = models.CharField(max_length=255, blank=True, verbose_name='Slug')

    class Meta:
        abstract = True

    def __str__(self):
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
        verbose_name = 'Tag'
        verbose_name_plural = 'Tagi'


class Country(SlugifyModel):

    class Meta:
        abstract = False
        verbose_name = 'Kraj'
        verbose_name_plural = 'Kraje'

    @property
    def sorted_posts(self):
        return self.posts.order_by('destination')


class Photo(models.Model):
    photo = models.ImageField(
        upload_to=photo_upload_to, verbose_name='Zdjęcie')
    trip_day = models.ForeignKey(
        Day, verbose_name='Dzień wycieczki', related_name='photos',
        on_delete=models.CASCADE)
    description = models.CharField(
        max_length=255, null=True, blank=True, verbose_name='Opis')

    class Meta:
        verbose_name = 'Zdjęcie'
        verbose_name_plural = 'Zdjęcia'

    def __str__(self):
        return '{0} ({1})'.format(self.trip_day, self.photo.url)

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
        image_file = StringIO()
        image.thumbnail(size)
        image.save(image_file, 'JPEG')
        self.photo.file = image_file


class News(models.Model):
    title = models.CharField(
        max_length=255, null=True, blank=True, verbose_name='Tytył')
    text = models.TextField(verbose_name='Tekst')
    created_at = models.DateField(verbose_name='Data wpisu')

    class Meta:
        verbose_name = 'Wpis'
        verbose_name_plural = 'Wpisy'

    def __str__(self):
        return '{} {}'.format(self.created_at.strftime('%F'), self.title)


class Post(models.Model):
    author = models.CharField(max_length=255, verbose_name='Autor')
    trip = models.ForeignKey(
        Trip, verbose_name='Wycieczka', related_name='posts',
        on_delete=models.CASCADE)
    content = models.TextField(verbose_name='Treść')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Utworzony')

    class Meta:
        verbose_name = 'Komentarz'
        verbose_name_plural = 'Komentarze'

    def __str__(self):
        return '{0} - {1}'.format(self.id, self.author)
