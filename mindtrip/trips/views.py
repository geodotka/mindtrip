#!/usr/bin/env python
# encoding: utf-8

import json
import os

from annoying.decorators import render_to, ajax_request
from django.conf import settings
from django.http.response import JsonResponse, Http404
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView

from .models import Trip, News, Country, Day, Tag


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
        'PHOTOS_DOMAIN': settings.PHOTOS_DOMAIN,
    }


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


class PhotoManagerTemplateView(TemplateView):
    template_name = 'photos/index.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            raise Http404
        return super().dispatch(request, *args, **kwargs)


@render_to('trips/tag.html')
def get_trips_by_tag(request, slug):
    tag = get_object_or_404(Tag, slug=slug)
    return {
        'tag': tag,
        'trips': Trip.objects.filter(tags__slug=slug).order_by('-start_at'),
    }


###############################################################################
#                                   API                                       #
###############################################################################

@ajax_request
def api_trips(request):
    if not request.user.is_superuser:
        raise Http404

    return {
        'trips': [
            trip.to_dict() for trip in Trip.objects.all().order_by(
                '-start_at').prefetch_related('days')],
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
