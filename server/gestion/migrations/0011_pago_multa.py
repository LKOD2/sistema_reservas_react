# Generated by Django 5.1.3 on 2024-12-10 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0010_pago_saldo_restante'),
    ]

    operations = [
        migrations.AddField(
            model_name='pago',
            name='multa',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=10),
        ),
    ]
