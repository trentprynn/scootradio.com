from django.urls import path
from . import views


urlpatterns = [
    path("api/v1/health", views.health),
    path("api/v1/radioStations", views.radio_stations),
]
