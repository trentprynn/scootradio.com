from django.db import models


class RadioStation(models.Model):
    name = models.CharField(max_length=100, unique=True)
    url = models.URLField()
    imgUrl = models.URLField()
