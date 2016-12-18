#!/usr/bin/env python
# encoding: utf-8

from django.contrib import admin

from .models import Trip, Day, Tag


admin.site.register(Trip)
admin.site.register(Day)
admin.site.register(Tag)
