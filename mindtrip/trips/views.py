#!/usr/bin/env python
# encoding: utf-8

import json

from annoying.decorators import render_to
from django.core import serializers
from django.shortcuts import get_object_or_404

from .models import Trip


@render_to('trips/home.html')
def home(request):
    trips = serializers.serialize('json', Trip.objects.all().order_by(
        '-start_at'), fields=('destination', 'picture', 'start_at', 'end_at'))
    return {'trips': json.dumps(trips)}


@render_to('trips/contact.html')
def contact(request):
    return {}


@render_to('trips/trip.html')
def trip(request, trip_id):
    trip_ = get_object_or_404(
        Trip.objects.select_related('country'), id=trip_id)
    return {'trip': trip_}
