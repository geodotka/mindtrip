#!/usr/bin/env python
# encoding: utf-8

from django.template.defaultfilters import slugify as original_slugify


def slugify(s):
    return original_slugify(s.replace('ł', 'l').replace('Ł', 'L'))
