# Generated by Django 5.1.3 on 2024-11-29 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0002_rename_precio_por_noche_habitacion_precio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habitacion',
            name='estado',
            field=models.CharField(choices=[('disponible', 'Disponible'), ('ocupada', 'Ocupada'), ('limpieza', 'En Limpieza')], max_length=20),
        ),
    ]
