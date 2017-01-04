#!/usr/bin/env python
# encoding: utf-8

from django.contrib import admin

from .models import Trip, Day, Tag, Country, Photo


admin.site.register(Trip)
admin.site.register(Day)
admin.site.register(Tag)
admin.site.register(Country)
admin.site.register(Photo)
