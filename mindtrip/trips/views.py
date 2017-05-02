#!/usr/bin/env python
# encoding: utf-8

import json

from annoying.decorators import render_to
from django.core import serializers
from django.shortcuts import get_object_or_404

from .models import Trip, News, Country
from .forms import AddPost


@render_to('trips/home.html')
def home(request):
    trips = serializers.serialize(
        'json', Trip.objects.all().order_by('-start_at'),
        fields=('destination', 'picture', 'start_at', 'end_at', 'is_complete'))
    news = News.objects.all().order_by('-created_at', '-id')
    return {
        'trips': json.dumps(trips),
        'news': news,
    }


@render_to('trips/trip.html')
def get_trip(request, trip_id):
    trip_ = get_object_or_404(
        Trip.objects.select_related('country'), id=trip_id)
    if not request.user.is_superuser:
        trip_.views_counter += 1
        trip_.save()
    add_post_form = AddPost(request.POST or None)
    if add_post_form.is_valid():
        add_post_form.trip_id = trip_.id
        add_post_form.save()

    prev_trip = Trip.objects.filter(start_at__gt=trip_.start_at) \
        .order_by('start_at').first()
    next_trip = Trip.objects.filter(start_at__lt=trip_.start_at) \
        .order_by('-start_at').first()
    return {
        'trip': trip_,
        'form': add_post_form,
        'prev_trip': {
            'id': prev_trip.id,
            'destination': prev_trip.destination,
        } if prev_trip is not None else None,
        'next_trip': {
            'id': next_trip.id,
            'destination': next_trip.destination,
        } if next_trip is not None else None,
        'photos_json': json.dumps(trip_.get_photo_list_for_gallery())
    }


@render_to('trips/trips.html')
def get_trips(request):
    countries = Country.objects.all().order_by('name')
    return {'countries': countries}
