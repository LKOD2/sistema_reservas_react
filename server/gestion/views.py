from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .permissions import *


class CrearReserva(APIView):
    def post(self, request):
        data = request.data
        try:
            habitacion = Habitacion.objects.get(id=data['habitacion_id'])
            huesped = Huesped.objects.get(id=data['huesped_id'])
            
            if habitacion.estado != 'disponible':
                return Response({"error": "La habitación no está disponible."}, status=status.HTTP_400_BAD_REQUEST)
            
            reserva = Reserva.objects.create(
                hotel=habitacion.hotel,
                huesped=huesped,
                habitacion=habitacion,
                fecha_checkin=data['fecha_checkin'],
                fecha_checkout=data['fecha_checkout'],
                estado='pendiente',
            )
            return Response({"mensaje": "Reserva creada con éxito.", "reserva_id": reserva.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




class ProductoViewSet(viewsets.ModelViewSet):
    # Define el queryset predeterminado
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    # Configura el filtro de búsqueda
    filter_backends = (SearchFilter,)  
    search_fields = ('nombre',)  

    def get_queryset(self):
        queryset = super().get_queryset()

        estado = self.request.query_params.get('estado', None)
        hotel = self.request.query_params.get('hotel', None)

        if hotel and estado:
            
            if estado and estado != 'todo':
                queryset = queryset.filter(estado=estado, hotel_id=hotel)
                return queryset

            queryset = queryset.filter(hotel_id=hotel)
            return queryset
            
        return queryset


class HabitacionViewSet(viewsets.ModelViewSet):
    # Define el queryset predeterminado
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer

    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    # Configura el filtro de búsqueda
    filter_backends = (SearchFilter,)
    search_fields = ('numero','tipo','estado') 

    def get_queryset(self):
        queryset = super().get_queryset()

        estado = self.request.query_params.get('estado', None)
        hotel = self.request.query_params.get('hotel', None)

        if hotel and estado:
            
            if estado and estado != 'todo':
                queryset = queryset.filter(estado=estado, hotel_id=hotel)
                return queryset

            queryset = queryset.filter(hotel_id=hotel)
            return queryset
            
        return queryset

class HuespedViewSet(viewsets.ModelViewSet):
    queryset = Huesped.objects.all()
    serializer_class = HuespedSerializer
    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    filter_backends = (SearchFilter,) 
    search_fields = ['nombre', 'num_documento'] 

    def get_queryset(self):
        queryset = super().get_queryset()

        estado = self.request.query_params.get('estado', None)
        hotel = self.request.query_params.get('hotel', None)

        if hotel and estado:
            
            if estado and estado != 'todo':
                queryset = queryset.filter(estado=estado, hotel_id=hotel)
                return queryset

            queryset = queryset.filter(hotel_id=hotel)
            return queryset
            
        return queryset


class HotelViewSet(viewsets.ModelViewSet):
    # Define el queryset predeterminado
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    # Configura el filtro de búsqueda
    filter_backends = (SearchFilter,)
    search_fields = ('nombre') 

    def get_queryset(self):

        queryset = super().get_queryset() 

        # Filtra por habitaciones activas
        estado = self.request.query_params.get('estado', None)
        print(estado, '-------------------')
        if estado == 'todo':
            queryset = queryset.all()
        elif estado is not None:
            queryset = queryset.filter(estado=estado)

        return queryset





# class HabitacionView(APIView):

#     def get_object(self, pk):
#         try:
#             return Habitacion.objects.get(pk=pk)
#         except Habitacion.DoesNotExist:
#             return None

#     def get(self, request, pk=None):
#         if pk:
#             habitacion = self.get_object(pk)
#             if habitacion:
#                 serializer = HabitacionSerializer(habitacion)
#                 return Response(serializer.data)
#             return Response({"detail": "Habitacion no encontrada"}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             habitaciones = Habitacion.objects.all()
#             if not habitaciones:
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             serializer = HabitacionSerializer(habitaciones, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = HabitacionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         habitacion = self.get_object(pk)
#         if habitacion is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = HabitacionSerializer(habitacion, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         habitacion = self.get_object(pk)
#         if habitacion is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         habitacion.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
