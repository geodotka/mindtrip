#!/usr/bin/env python
# encoding: utf-8

from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^geodotka/', admin.site.urls),
    url(r'^google7daa94b016bce91b.html',
        TemplateView.as_view(template_name='google.html')),

    url(r'^', include('mindtrip.quizzes.urls')),
    url(r'^', include('mindtrip.trips.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
