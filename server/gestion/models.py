from django.db import models

# Create your models here.
from django.db import models

class Hotel(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.TextField()
    telefono = models.CharField(max_length=15)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nombre


class Habitacion(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='habitaciones')
    numero = models.CharField(max_length=10, unique=True)
    tipo = models.CharField(max_length=50, choices=[('simple', 'Simple'), ('doble', 'Doble'), ('triple', 'Triple')])
    orientacion = models.CharField(max_length=100, default=None)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[('disponible', 'Disponible'), ('ocupada', 'Ocupada'), ('limpieza', 'En Limpieza')])

    def __str__(self):
        return f"Habitación {self.numero} - {self.hotel.nombre}"


class Huesped(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='huespedes')
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    pais = models.CharField(max_length=15)
    tipo_documento = models.CharField(max_length=15)
    num_documento = models.CharField(max_length=12, unique=True)
    estado = models.CharField(max_length=20, choices=[('activo', 'Activo'), ('finalizado', 'Finalizado')], default='activo')

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Reserva(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reservas')    
    huesped = models.ForeignKey(Huesped, on_delete=models.CASCADE, related_name='reservas')
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE, related_name='reservas')
    fecha_reserva = models.DateField(auto_now_add=True)
    fecha_checkin = models.DateField()
    fecha_checkout = models.DateField()
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('confirmada', 'Confirmada'), ('cancelada', 'Cancelada')])

    def __str__(self):
        return f"Reserva {self.id} - {self.huesped.nombre} {self.huesped.apellido}"

class Producto(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='productos')
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.IntegerField()
    estado = models.CharField(max_length=20, choices=[('disponible', 'Disponible'), ('no_disponible', 'No disponible')])

    def __str__(self):
        return self.nombre

class VentaProducto(models.Model):
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE, related_name='ventas_producto')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='ventas')
    cantidad = models.IntegerField()
    fecha_venta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Venta Producto {self.id} - {self.producto.nombre}"

class Venta(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='ventas')
    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name='venta', null=True, blank=True)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago = models.CharField(max_length=50, choices=[('efectivo', 'Efectivo'), ('tarjeta', 'Tarjeta'), ('transferencia', 'Transferencia')])

    def __str__(self):
        return f"Venta {self.id} - Total: {self.total}"