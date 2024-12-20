# Generated by Django 5.1.3 on 2024-12-03 21:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0005_rename_rut_huesped_num_documento_huesped_estado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='huesped',
            name='hotel',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='huespedes', to='gestion.hotel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='producto',
            name='hotel',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='gestion.hotel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reserva',
            name='hotel',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='reservas', to='gestion.hotel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='venta',
            name='hotel',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to='gestion.hotel'),
            preserve_default=False,
        ),
    ]
