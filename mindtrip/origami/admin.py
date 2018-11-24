#!/usr/bin/env python
# encoding: utf-8

from django.contrib import admin

from .models import Item

admin.site.register(Item)
