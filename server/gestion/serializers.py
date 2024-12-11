from rest_framework import serializers
from .models import *

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class HabitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitacion
        fields = '__all__'


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class HuespedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Huesped
        fields = '__all__'

class VentaReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaReserva
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'


class VentaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaProducto
        fields = '__all__'
