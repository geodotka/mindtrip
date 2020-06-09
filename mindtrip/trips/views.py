#!/usr/bin/env python
# encoding: utf-8

import json
import os

from annoying.decorators import render_to, ajax_request
from django.conf import settings
from django.http.response import JsonResponse, Http404
from django.shortcuts import get_object_or_404
from django.views.generic.base import TemplateView

from .models import Trip, News, Country
from .forms import AddPost


@render_to('trips/home.html')
def home(request):
    trips = Trip.objects.all().only(
        'id', 'destination', 'picture', 'start_at', 'end_at', 'is_complete') \
        .order_by('-start_at')[:]
    return {
        'trips': trips,
        'trip_id_list': [trip.id for trip in trips],
        'news': News.objects.all().order_by('-created_at', '-id'),
    }


@render_to('trips/trip.html')
def get_trip(request, trip_id):
    trip_ = get_object_or_404(Trip, id=trip_id)
    if not request.user.is_superuser:
        trip_.views_counter += 1
        trip_.save()

    prev_trip = Trip.objects.filter(start_at__gt=trip_.start_at) \
        .order_by('start_at').first()
    next_trip = Trip.objects.filter(start_at__lt=trip_.start_at) \
        .order_by('-start_at').first()
    return {
        'trip': trip_,
        'countries': trip_.countries,
        'prev_trip': {
            'id': prev_trip.id,
            'destination': prev_trip.destination,
        } if prev_trip is not None else None,
        'next_trip': {
            'id': next_trip.id,
            'destination': next_trip.destination,
        } if next_trip is not None else None,
        'photos_json': json.dumps(trip_.get_photo_list_for_gallery()),
    }


@render_to('trips/trips.html')
def get_trips(request):
    countries = Country.objects.all().order_by('name')
    return {'countries': countries}


def get_statistics(request):
    if not request.user.is_superuser:
        raise Http404
    return JsonResponse(
        ['{}: {}'.format(t.destination, t.views_counter) for t
         in Trip.objects.all().order_by('-views_counter')], safe=False)


class AboutMeTemplateView(TemplateView):
    template_name = 'trips/about_me.html'

    def get_context_data(self, **kwargs):
        kwargs = super(AboutMeTemplateView, self).get_context_data(**kwargs)
        capitals = sorted(os.listdir(os.path.join(
            settings.STATIC_ROOT, 'img', 'trips', 'capitals')))
        countries = sorted(os.listdir(os.path.join(
            settings.STATIC_ROOT, 'img', 'trips', 'countries')))
        kwargs.update({
            'capitals': [
                [file_name, '{}. {}'.format(
                    file_name[:2], file_name[2:-4].replace('_', ' '))]
                for file_name in capitals],
            'countries': [
                [file_name, '{}. {}'.format(
                    file_name[:2], file_name[2:-4].replace('_', ' '))]
                for file_name in countries]
        }),
        return kwargs


###############################################################################
#                                   API                                       #
###############################################################################

@ajax_request
def api_trips(request):
    return [
        trip.to_dict() for trip in Trip.objects.all().prefetch_related('days')]
