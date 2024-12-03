from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usuarios.views import UsuarioView


router = DefaultRouter()
router.register(r'usuarios', UsuarioView, 'usuarios')

urlpatterns = [
    path('api/', include(router.urls))
]