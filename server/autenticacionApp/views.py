from django.shortcuts import render, get_object_or_404
from django.contrib.auth import login, logout, authenticate

from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import LoginSerializer
from usuarios.serializers import *

class LoginView(APIView):
    def post(self, request):
        data = request.data

        username = data.get('usuario')
        password = data.get('clave')

        if not username or not password:
            return Response({'error': 'Usuario y clave son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)

            user_data = LoginSerializer(user).data 

            return Response({'token': token.key, 'user': user_data})
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        print('funciona logout')
        logout(request)
        return Response({"message": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)