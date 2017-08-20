#!/usr/bin/env python
# encoding: utf-8

from django.contrib import admin

from .models import Trip, Day, Tag, Country, Photo, News, Post


class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', )


admin.site.register(Trip)
admin.site.register(Day)
admin.site.register(Tag)
admin.site.register(Country)
admin.site.register(Photo)
admin.site.register(News)
admin.site.register(Post, PostAdmin)
