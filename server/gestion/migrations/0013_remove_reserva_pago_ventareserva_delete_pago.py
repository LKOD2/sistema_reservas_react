# Generated by Django 5.1.3 on 2024-12-10 18:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0012_remove_ventaproducto_cantidad_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reserva',
            name='pago',
        ),
        migrations.CreateModel(
            name='VentaReserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_venta', models.DateTimeField(auto_now_add=True)),
                ('adelanto', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total_estadia', models.DecimalField(decimal_places=2, max_digits=10)),
                ('multa', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('saldo_restante', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')], default='pendiente', max_length=20)),
                ('reserva', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='venta_reserva', to='gestion.reserva')),
            ],
        ),
        migrations.DeleteModel(
            name='Pago',
        ),
    ]