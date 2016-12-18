#!/usr/bin/env python
# encoding: utf-8

from annoying.decorators import render_to


@render_to('trips/home.html')
def home(request):
    return {}
