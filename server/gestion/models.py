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
    numero = models.CharField(max_length=10, unique=False)
    tipo = models.CharField(max_length=50, choices=[('simple', 'Simple'), ('doble', 'Doble'), ('triple', 'Triple')])
    orientacion = models.CharField(max_length=100, default=None)
    precio = models.DecimalField(max_digits=10, decimal_places=0)
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
    fecha_entrada = models.DateField()
    fecha_salida = models.DateField()
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('confirmada', 'Confirmada'), ('cancelada', 'Cancelada'), ('finalizada', 'Finalizada')])

    def __str__(self):
        return f"Reserva {self.id} - {self.huesped.nombre} {self.huesped.apellido}"



class Producto(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='productos')
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=0)
    stok = models.IntegerField()
    estado = models.CharField(max_length=20, choices=[('disponible', 'Disponible'), ('no_disponible', 'No disponible')])

    def __str__(self):
        return self.nombre


class VentaProducto(models.Model):
    reserva = models.ForeignKey(Reserva, on_delete=models.SET_NULL, related_name='ventas_producto', null=True, blank=True)  # Opcionalmente asociada a una reserva.
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=0, default=0)  # Monto total de esta venta.
    estado = models.CharField(
        max_length=20,
        choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')],
        default='pendiente'
    )

    def __str__(self):
        return f"Venta Producto {self.id} - Total: {self.total}, Estado: {self.estado}"

class VentaProductoDetalle(models.Model):
    venta = models.ForeignKey(VentaProducto, on_delete=models.CASCADE, related_name='detalles')  # Relación con la venta global.
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='ventas')
    cantidad = models.PositiveIntegerField()  # Cantidad comprada.
    subtotal = models.DecimalField(max_digits=10, decimal_places=0)  # Precio * Cantidad.

    def save(self, *args, **kwargs):
        # Calcular subtotal automáticamente al guardar.
        self.subtotal = self.producto.precio * self.cantidad
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Detalle Venta Producto {self.id} - {self.producto.nombre} - Cantidad: {self.cantidad}"


class VentaReserva(models.Model):
    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name='venta_reserva')  # Una reserva tiene una venta asociada.
    fecha_venta = models.DateTimeField(auto_now_add=True)
    adelanto = models.DecimalField(max_digits=10, decimal_places=0, default=0)  # Adelanto pagado.
    total_estadia = models.DecimalField(max_digits=10, decimal_places=0)  # Total de la estadía.
    multa = models.DecimalField(max_digits=10, decimal_places=0, default=0)  # Multa aplicada.
    saldo_restante = models.DecimalField(max_digits=10, decimal_places=0, default=0)  # Calculado automáticamente.
    estado = models.CharField(
        max_length=20,
        choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')],
        default='pendiente'
    )

    def calcular_saldo_restante(self):
        self.saldo_restante = self.total_estadia - self.adelanto + self.multa
        self.save()

    def __str__(self):
        return f"Venta Reserva {self.id} - Reserva {self.reserva.id} - Saldo Restante: {self.saldo_restante}"
    
# class Pago(models.Model):
#     venta_reserva = models.ForeignKey(VentaReserva, on_delete=models.CASCADE, related_name='pagos')  # Relación muchos a uno.
#     fecha_pago = models.DateTimeField(auto_now_add=True)
#     tipo_pago = models.CharField(max_length=20, choices=[('efectivo', 'Efectivo'), ('tarjeta', 'Tarjeta')])
#     monto = models.DecimalField(max_digits=10, decimal_places=0)  # Monto del pago.

#     def __str__(self):
#         return f"Pago {self.id} - Monto: {self.monto} - VentaReserva: {self.venta_reserva.id}"




# class VentaProducto(models.Model):
#     venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='productos')  # Asociar a una venta global
#     producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='ventas')
#     cantidad = models.PositiveIntegerField()  # Evitar cantidades negativas
    
#     def __str__(self):
#         return f"Venta Producto {self.id} - {self.producto.nombre}"

# class Venta(models.Model):
#     reserva = models.OneToOneField(Reserva, on_delete=models.SET_NULL, related_name='venta', null=True, blank=True)
#     fecha_venta = models.DateTimeField(auto_now_add=True)
#     total = models.DecimalField(max_digits=10, decimal_places=0, default=0)
#     metodo_pago = models.CharField(
#         max_length=50, 
#         choices=[('efectivo', 'Efectivo'), ('tarjeta', 'Tarjeta'), ('transferencia', 'Transferencia')]
#     )
#     estado = models.CharField(
#         max_length=20, 
#         choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')], 
#         default='pendiente'
#     )

#     def __str__(self):
#         return f"Venta {self.id} - Total: {self.total}"
