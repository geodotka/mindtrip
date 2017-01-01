#!/usr/bin/env python
# encoding: utf-8

from annoying.decorators import render_to
from django.core import serializers

from .models import Trip


@render_to('trips/home.html')
def home(request):
    trips = serializers.serialize('json', Trip.objects.all().order_by(
        'start_at'), fields=('destination', 'picture', 'start_at', 'end_at'))
    return {'trips': trips}


@render_to('trips/contact.html')
def contact(request):
    return {}
