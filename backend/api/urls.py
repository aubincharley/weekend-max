from django.urls import path,include
from .views import LogsViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'logs', LogsViewSet)
urlpatterns = [
    path('', include(router.urls)),
]