#!/usr/bin/env python
# encoding: utf-8

import os

from django.db import models


def photo_upload_to(instance, filename):
    return os.sep.join(['origami', filename])


class Item(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nazwa')
    description = models.TextField(null=True, blank=True, verbose_name='Opis')
    photo1 = models.ImageField(
        upload_to=photo_upload_to, verbose_name='Zdjęcie 1')
    photo2 = models.ImageField(
        upload_to=photo_upload_to, null=True, blank=True,
        verbose_name='Zdjęcie 2')
    diagram_url = models.URLField(
        null=True, blank=True, verbose_name='Adres diagramu')
    diagram_file = models.FileField(
        null=True, blank=True, verbose_name='Plik diagramu')
    video_url = models.URLField(
        null=True, blank=True, verbose_name='Adres video')

    class Meta:
        verbose_name = 'Origami'
        verbose_name_plural = 'Origami'

    def __str__(self):
        return self.name
