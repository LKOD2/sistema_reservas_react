from django.urls import path, include

from .views import *

from rest_framework.routers import DefaultRouter
from .views import HabitacionViewSet

# Crear una instancia del router
router = DefaultRouter()

# Registrar el ViewSet con el router
router.register(r'productos', ProductoViewSet)
router.register(r'habitaciones', HabitacionViewSet)
router.register(r'hoteles', HotelViewSet)
router.register(r'huespedes', HuespedViewSet)


# Las URLs automáticamente se generarán
urlpatterns = router.urls
