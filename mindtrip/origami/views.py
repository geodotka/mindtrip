#!/usr/bin/env python
# encoding: utf-8

from annoying.decorators import render_to
from django.shortcuts import get_object_or_404

from .models import Item


@render_to('origami/index.html')
def index(request):
    return {'origami': Item.objects.all()}


@render_to('origami/item.html')
def get_item(request, item_id):
    return {'item' : get_object_or_404(Item, id=item_id)}
