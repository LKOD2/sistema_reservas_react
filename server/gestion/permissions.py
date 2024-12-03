from rest_framework.permissions import BasePermission

class PermisosVerificacion(BasePermission):
    """
    Permite el acceso solo a usuarios autenticados que sean staff o superusuario.
    """
    def has_permission(self, request, view):
        print('nose lalal', request.user)
        return request.user and request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser)
