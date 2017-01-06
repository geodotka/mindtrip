#!/usr/bin/env python
# encoding: utf-8

from django import forms

from .models import Post


class AddPost(forms.ModelForm):
    
    class Meta:
        model = Post
        fields = ['author', 'content']
        
    def __init__(self, *args, **kwargs):
        self.trip_id = None
        super(AddPost, self).__init__(*args, **kwargs)
        
    def save(self, commit=True):
        self.instance.trip_id = self.trip_id
        super(AddPost, self).save(commit)
