from django.db import models

# Create your models here.

class Usuario(models.Model):
    user_name = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(max_length=200)
    rol = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)


    def __str__(self) :
        return self.user_name
