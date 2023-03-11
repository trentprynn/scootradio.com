from django.utils import timezone
from authlib.integrations.django_oauth2 import ResourceProtector
from django.http import JsonResponse
from . import validator

from .models import RadioStation

require_auth = ResourceProtector()
validator = validator.Auth0JWTBearerTokenValidator()
require_auth.register_token_validator(validator)


def health(request):
    response = {"status": "alive", "time": timezone.now()}
    return JsonResponse(response)


@require_auth()
def radio_stations(request):
    radio_stations = list(RadioStation.objects.all().values())
    return JsonResponse(radio_stations, safe=False)
