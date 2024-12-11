from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
    """
    Permiso personalizado que permite acceso solo a superusuarios.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = User.objects.all()
        is_active = self.request.query_params.get('is_active')

        if is_active and is_active.lower() in ['true', 'false']:
            queryset = queryset.filter(is_active=(is_active.lower() == 'true'))
        
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data

        username = data.get('username')
        password = data.get('password')

        print('form data user:=============', data)

        if not username or not password:
            return Response(
                {'error': 'El nombre de usuario y la contraseña son requeridos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'El nombre de usuario ya existe'},
                status=status.HTTP_400_BAD_REQUEST
            )

        allowed_fields = {
            'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active'
        }
        user_data = {field: data[field] for field in allowed_fields if field in data}

        user = User(**user_data)
        user.set_password(password)
        user.save()

        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
