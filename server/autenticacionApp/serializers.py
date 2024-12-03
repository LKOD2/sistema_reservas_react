from rest_framework import serializers

# Serializer para estructurar el usuario
class LoginSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField(max_length=150)
