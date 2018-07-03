#!/usr/bin/env python
# encoding: utf-8

from django.contrib import admin

from .models import Photo, Quiz

admin.site.register(Quiz)
admin.site.register(Photo)
