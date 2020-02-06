#!/usr/bin/env python
# encoding: utf-8

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView


urlpatterns = [
    path('geodotka/', admin.site.urls),
    path('google7daa94b016bce91b.html',
         TemplateView.as_view(template_name='google.html')),

    path('', include('mindtrip.quizzes.urls')),
    path('', include('mindtrip.trips.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
