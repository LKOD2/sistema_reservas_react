
from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'user_name', 'nombre', 'apellido', 'email', 'rol', 'estado')
        model = Usuario
        fields = '__all__' # extrae todos los campos del modelo