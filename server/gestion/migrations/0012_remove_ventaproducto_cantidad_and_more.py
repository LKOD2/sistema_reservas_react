# Generated by Django 5.1.3 on 2024-12-10 17:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0011_pago_multa'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ventaproducto',
            name='cantidad',
        ),
        migrations.RemoveField(
            model_name='ventaproducto',
            name='habitacion',
        ),
        migrations.RemoveField(
            model_name='ventaproducto',
            name='producto',
        ),
        migrations.AddField(
            model_name='ventaproducto',
            name='estado',
            field=models.CharField(choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')], default='pendiente', max_length=20),
        ),
        migrations.AddField(
            model_name='ventaproducto',
            name='reserva',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ventas_producto', to='gestion.reserva'),
        ),
        migrations.AddField(
            model_name='ventaproducto',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.CreateModel(
            name='VentaProductoDetalle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField()),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to='gestion.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalles', to='gestion.ventaproducto')),
            ],
        ),
        migrations.DeleteModel(
            name='Venta',
        ),
    ]