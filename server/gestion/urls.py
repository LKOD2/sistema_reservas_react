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
#router.register(r'reservas', ReservaView)


# Las URLs automáticamente se generarán
#urlpatterns = router.urls

urlpatterns = [
    path('reservar/', ReservaView.as_view(), name='reservar'),
    path('salida/', SalidaView.as_view(), name='salida'),
    path('venta/', VentaView.as_view(), name='venta'),
    path('data/', DataView.as_view(), name='data'),
    path('mantenimiento/', MantenimientoView.as_view(), name='mantenimiento'),
] + router.urls
