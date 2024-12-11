# Generated by Django 5.1.3 on 2024-12-11 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0013_remove_reserva_pago_ventareserva_delete_pago'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ventaproducto',
            name='total',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='ventaproductodetalle',
            name='subtotal',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='ventareserva',
            name='adelanto',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='ventareserva',
            name='multa',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='ventareserva',
            name='saldo_restante',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='ventareserva',
            name='total_estadia',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
    ]