from django.shortcuts import render

# Create your views here.

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UsuarioSerializer

# @api_view(['POST'])
# def crear_usuario(request):
#     serializer = UsuarioSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import Usuario

class UsuarioView(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer