#!/usr/bin/env python
# encoding: utf-8

from __builtin__ import unicode

from django.template.defaultfilters import slugify as original_slugify


def slugify(s):
    return original_slugify(unicode(s).replace(u'ł', 'l').replace(u'Ł', 'L'))
