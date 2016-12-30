#!/usr/bin/env python
# encoding: utf-8

from annoying.decorators import render_to


@render_to('trips/base.html')
def home(request):
    return {}


@render_to('trips/contact.html')
def contact(request):
    return {}
