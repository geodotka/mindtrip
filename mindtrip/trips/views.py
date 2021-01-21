#!/usr/bin/env python
# encoding: utf-8

import json
import os

from annoying.decorators import ajax_request
from django.conf import settings
from django.http.response import JsonResponse, Http404
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView

from .models import Trip, News, Day, Tag


def get_statistics(request):
    if not request.user.is_superuser:
        raise Http404
    return JsonResponse(
        ['{}: {}'.format(t.destination, t.views_counter) for t
         in Trip.objects.all().order_by('-views_counter')], safe=False)


class PhotosManagerTemplateView(TemplateView):
    template_name = 'trips/index.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            raise Http404
        return super().dispatch(request, *args, **kwargs)


###############################################################################
#                                   API                                       #
###############################################################################

@ajax_request
def api_trips(request):
    tag_slug = request.GET.get('tag')
    if tag_slug is not None:
        tag = get_object_or_404(Tag, slug=tag_slug)
        return {
            'tag': tag.to_react(),
            'trips': [trip.to_react() for trip in
                      Trip.objects.filter(tags__slug=tag_slug)],
        }
    if request.GET.get('photos_manager') is not None:
        return {
            'trips': [
                trip.to_react_photos_manager() for trip in Trip.objects.all()
                    .prefetch_related('days')],
            'photosDomain': settings.PHOTOS_DOMAIN,
        }
    return {'trips': [trip.to_react() for trip in Trip.objects.all()]}


@ajax_request
def api_trip(request, trip_id):
    trip_ = get_object_or_404(Trip, id=trip_id)
    if not request.user.is_superuser:
        trip_.views_counter += 1
        trip_.save()

    prev_trip = Trip.objects.filter(start_at__gt=trip_.start_at) \
        .order_by('start_at').first()
    next_trip = Trip.objects.filter(start_at__lt=trip_.start_at) \
        .order_by('-start_at').first()
    return {
        'trip': trip_.to_react_trip_page(),
        'countries': trip_.countries,
        'prevTrip': {
            'id': prev_trip.id,
            'destination': prev_trip.destination,
        } if prev_trip is not None else None,
        'nextTrip': {
            'id': next_trip.id,
            'destination': next_trip.destination,
        } if next_trip is not None else None,
        'photosDomain': settings.PHOTOS_DOMAIN,
    }


@csrf_exempt
@ajax_request
def api_save_trip(request, trip_id, day_id):
    if not request.user.is_superuser:
        raise Http404

    day = Day.objects.select_for_update().filter(
        id=day_id, trip_id=trip_id).first()
    if day is None:
        return {'success': False}
    day.photos_json = json.loads(request.body).get('photos', [])
    day.save()
    return {'success': True}


@csrf_exempt
@ajax_request
def api_get_old_trip_photos(request, trip_id, day_id):
    if not request.user.is_superuser:
        raise Http404

    day = Day.objects.filter(
        id=day_id, trip_id=trip_id).first()
    if day is None:
        return {'success': False}
    return {
        'photos': [photo.to_old_data_dict() for photo in day.photos.all()],
        'success': True,
    }


@ajax_request
def api_trips_gallery(request):
    return {'trips': [
        trip.to_react() for trip in Trip.objects.all().only(
            'id', 'destination', 'picture', 'start_at', 'end_at',
            'is_complete').order_by('-start_at')[:]
    ]}


@ajax_request
def api_news(request):
    news = News.objects.all()
    from_id = request.GET.get('from_id')
    if from_id is not None:
        try:
            from_id = int(from_id)
        except (TypeError, ValueError):
            pass
        else:
            news = news.filter(id__lt=from_id)

    return {'news': [n.to_react() for n in news[:10]]}


@ajax_request
def api_about_me(request):
    capitals = sorted(os.listdir(os.path.join(
        settings.STATIC_ROOT, 'img', 'trips', 'capitals')))
    countries = sorted(os.listdir(os.path.join(
        settings.STATIC_ROOT, 'img', 'trips', 'countries')))
    return {
        'capitals': [
            {
                'fileName': file_name,
                'description': '{}. {}'.format(
                    file_name[:2], file_name[2:-4].replace('_', ' '))
            } for file_name in capitals
        ],
        'countries': [
            {
                'fileName': file_name,
                'description': '{}. {}'.format(
                    file_name[:2], file_name[2:-4].replace('_', ' '))
            } for file_name in countries
        ]
    }
