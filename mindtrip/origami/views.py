#!/usr/bin/env python
# encoding: utf-8

from annoying.decorators import render_to
from django.shortcuts import get_object_or_404


@render_to('origami/index.html')
def index(request):
    return {}


@render_to('origami/item.html')
def get_item(request, item_id):
    return {}
