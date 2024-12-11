from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .permissions import *
from django.core.exceptions import ObjectDoesNotExist

from django.db import transaction
from django.db.models import Count


class MantenimientoView(APIView):

    def get(self, request):

        hotel_id = request.query_params.get('hotel')

        if not hotel_id:
            return Response({"error": "Se requiere el ID del hotel."}, status=status.HTTP_400_BAD_REQUEST)

        # Filtrar habitaciones cuyo estado sea 'limpieza'
        habitaciones = Habitacion.objects.filter(hotel=hotel_id, estado='limpieza')
        
        # Serializar las habitaciones
        serializer = HabitacionSerializer(habitaciones, many=True)
        
        # Devolver las habitaciones filtradas en la respuesta
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        # Obtener el ID de la habitación que se va a actualizar
        habitacion_id = request.data.get('id')  # Asumimos que el ID se pasa en el cuerpo de la solicitud
        nuevo_estado = request.data.get('estado')  # El nuevo estado que se va a aplicar
        
        # Asegurarse de que el estado sea válido
        if nuevo_estado not in ['disponible', 'ocupada', 'limpieza']:
            return Response({'error': 'Estado inválido'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la habitación por su ID
            habitacion = Habitacion.objects.get(id=habitacion_id)
            
            # Actualizar el estado de la habitación
            habitacion.estado = nuevo_estado
            habitacion.save()

            # Serializar la habitación actualizada
            serializer = HabitacionSerializer(habitacion)

            # Devolver la habitación actualizada
            return Response(serializer.data)

        except Habitacion.DoesNotExist:
            return Response({'error': 'Habitación no encontrada'}, status=status.HTTP_404_NOT_FOUND)


class DataView(APIView):
    def get(self, request):
        hotel_id = request.query_params.get('hotel')

        if not hotel_id:
            return Response({"error": "Se requiere el ID del hotel."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Filtrar habitaciones del hotel específico
            habitaciones = Habitacion.objects.filter(hotel=hotel_id)

            # Contar habitaciones por estado
            disponibles = habitaciones.filter(estado='disponible').count()
            ocupadas = habitaciones.filter(estado='ocupada').count()
            en_limpieza = habitaciones.filter(estado='limpieza').count()
            total = habitaciones.count()

            # Retornar los datos
            data = {
                "disponibles": disponibles,
                "ocupadas": ocupadas,
                "en_limpieza": en_limpieza,
                "total": total,
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

class ReservaView(APIView):
    def post(self, request):
        data = request.data

        data_huesped = data.get('huesped', None)
        data_reserva = data.get('reserva', None)
        data_pago = data.get('pago', None)
        data_habitacion = data.get('habitacion', None)

        print('huesped >>>>>>>>> ', data_huesped)
        print('reserva >>>>>>>>> ', data_reserva)
        print('habitacion >>>>>> ', data_habitacion)
        print('habitacion >>>>>> ', data_pago)

        try:
            habitacion = Habitacion.objects.get(id=data_habitacion)

            # Verifica si la habitación está disponible
            if habitacion.estado != 'disponible':
                return Response({"error": "La habitación no está disponible."}, status=status.HTTP_400_BAD_REQUEST)

            # Inicia una transacción atómica
            with transaction.atomic():

                # MANEJO DEL HUESPED
                huesped = None
                documento = data_huesped.get("num_documento")  # Cambia "numero_documento" según tu modelo
                if documento:
                    huesped = Huesped.objects.filter(num_documento=documento).first()

                if not huesped:
                    # Si el huésped no existe, se crea
                    serializer_huesped = HuespedSerializer(data=data_huesped)
                    if serializer_huesped.is_valid():
                        huesped = serializer_huesped.save()
                    else:
                        return Response(serializer_huesped.errors, status=status.HTTP_400_BAD_REQUEST)

                # Crear la reserva
                reserva_data = {
                    "hotel": habitacion.hotel.id,
                    "huesped": huesped.id,
                    "habitacion": habitacion.id,
                    "fecha_entrada": data_reserva["fecha_entrada"],
                    "fecha_salida": data_reserva["fecha_salida"],
                    "observacion": data_reserva.get("observacion", ""),
                    "estado": data_reserva["estado"],
                }
                serializer_reserva = ReservaSerializer(data=reserva_data)
                if serializer_reserva.is_valid():
                    reserva = serializer_reserva.save()

                    # Manejo del pago y creación de VentaReserva
                    data_pago["reserva"] = reserva.id  # Relaciona la reserva con el pago
                    serializer_venta = VentaReservaSerializer(data=data_pago)
                    if serializer_venta.is_valid():
                        venta_reserva = serializer_venta.save()
                        venta_reserva.calcular_saldo_restante() 
                    else:
                        return Response(serializer_venta.errors, status=status.HTTP_400_BAD_REQUEST)

                    # Actualiza el estado de la habitación
                    habitacion.estado = "ocupada"
                    habitacion.save()

                    return Response({"mensaje": "Reserva creada con éxito.", "reserva_id": reserva.id}, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer_reserva.errors, status=status.HTTP_400_BAD_REQUEST)

        except Habitacion.DoesNotExist:
            return Response({"error": "La habitación especificada no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SalidaView(APIView):
    def get(self, request):
        habitacion_id = request.query_params.get('habitacion')
        if not habitacion_id:
            return Response({"error": "Se requiere el ID de la habitación."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la reserva asociada a la habitación
            reserva = Reserva.objects.get(habitacion=habitacion_id, estado='confirmada')
            venta_reserva = VentaReserva.objects.get(reserva=reserva.id)
            huesped = Huesped.objects.get(id=reserva.huesped.id)

            # Obtener ventas de productos y detalles asociados
            ventas_producto = VentaProducto.objects.filter(reserva=reserva.id)
            detalles = VentaProductoDetalle.objects.filter(venta__in=ventas_producto)

            productos_vendidos_dict = {}

            for detalle in detalles:
                producto_id = detalle.producto.id  # Identificador único del producto

                if producto_id not in productos_vendidos_dict:
                    # Si el producto no está en el diccionario, agrégalo
                    productos_vendidos_dict[producto_id] = {
                        "id": producto_id,
                        "nombre": detalle.producto.nombre,
                        "precio": detalle.producto.precio,
                        "cantidad": detalle.cantidad,
                        "subtotal": detalle.subtotal,
                        "estado": detalle.venta.estado
                    }
                else:
                    # Si ya existe, actualiza cantidad y subtotal
                    productos_vendidos_dict[producto_id]["cantidad"] += detalle.cantidad
                    productos_vendidos_dict[producto_id]["subtotal"] += detalle.subtotal

            # Convierte el diccionario a una lista
            productos_vendidos = list(productos_vendidos_dict.values())

            # Serializar los datos principales
            reserva_serializer = ReservaSerializer(reserva)
            huesped_serializer = HuespedSerializer(huesped)
            venta_reserva_serializer = VentaReservaSerializer(venta_reserva) if venta_reserva else None
            ventas_producto_serializer = VentaProductoSerializer(ventas_producto, many=True)

            # Preparar la respuesta
            data = {
                'reserva': reserva_serializer.data,
                'huesped': huesped_serializer.data,
                'venta_reserva': venta_reserva_serializer.data if venta_reserva_serializer else None,
                'ventas_producto': ventas_producto_serializer.data,
                'productos_vendidos': productos_vendidos  # Diccionario agregado
            }

            return Response(data, status=status.HTTP_200_OK)

        except Reserva.DoesNotExist:
            return Response({"error": "No se encontró una reserva para la habitación dada."}, status=status.HTTP_404_NOT_FOUND)
        except Huesped.DoesNotExist:
            return Response({"error": "No se encontró un huésped asociado a la reserva."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request):
        try:
            data = request.data
            habitacion_id = data.get('habitacion', None)

            if not habitacion_id:
                return Response({"error": "Se requiere el ID de la habitación."}, status=status.HTTP_400_BAD_REQUEST)

            # Obtener datos relacionados
            reserva = Reserva.objects.get(habitacion=habitacion_id)
            venta_reserva = VentaReserva.objects.get(reserva=reserva.id)
            huesped = Huesped.objects.get(id=reserva.huesped.id)
            habitacion = Habitacion.objects.get(id=habitacion_id)

            # Validar que la reserva exista
            if not reserva:
                return Response({"error": "No se encontró una reserva activa para la habitación dada."}, status=status.HTTP_404_NOT_FOUND)

            # Actualizar el estado de la reserva
            reserva.estado = 'finalizada'
            reserva.save()

            # Actualizar el estado de la habitación (por ejemplo: disponible)
            habitacion.estado = 'limpieza'
            habitacion.save()

            # Actualizar el estado de la venta asociada
            venta_reserva.estado = 'pagado'
            venta_reserva.save()

            # Actualizar cualquier otro dato necesario (por ejemplo: productos vendidos)
            ventas_producto = VentaProducto.objects.filter(reserva=reserva.id)
            for venta_producto in ventas_producto:
                venta_producto.estado = 'pagado'
                venta_producto.save()

            # Registrar que el huésped ya hizo el checkout (si aplica)
            huesped.estado = 'finalizado'  # O el estado que tenga sentido en tu modelo
            huesped.save()

            return Response({"message": "Checkout realizado correctamente."}, status=status.HTTP_200_OK)

        except Reserva.DoesNotExist:
            return Response({"error": "No se encontró una reserva para la habitación dada."}, status=status.HTTP_404_NOT_FOUND)
        except Habitacion.DoesNotExist:
            return Response({"error": "No se encontró la habitación con el ID proporcionado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


        
            


class VentaView(APIView):
    def get(self, request):
        habitacion_id = request.query_params.get('habitacion')
        if not habitacion_id:
            return Response({"error": "Se requiere el ID de la habitación."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reserva = Reserva.objects.select_related('huesped').get(habitacion=habitacion_id)
            productos = Producto.objects.all()
            data = {
                'reserva': ReservaSerializer(reserva).data,
                'huesped': HuespedSerializer(reserva.huesped).data,
                'productos': ProductoSerializer(productos, many=True).data,
            }
            return Response(data, status=status.HTTP_200_OK)
        except Reserva.DoesNotExist:
            return Response({"error": "Reserva activa no encontrada para esta habitación."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        data = request.data
        habitacion_id = data.get("habitacion")
        productos = data.get("productos", [])

        if not habitacion_id or not productos:
            return Response({"error": "La habitación y los productos son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reserva = Reserva.objects.get(habitacion_id=habitacion_id)
            venta = VentaProducto.objects.create(reserva=reserva)

            for producto_data in productos:
                producto = Producto.objects.get(id=producto_data['id'])
                producto.stok = producto.stok - producto_data['cantidad']
                producto.save()
                VentaProductoDetalle.objects.create(
                    venta=venta,
                    producto=producto,
                    cantidad=producto_data['cantidad']
                )

            return Response(VentaProductoSerializer(venta).data, status=status.HTTP_201_CREATED)
        except Producto.DoesNotExist:
            return Response({"error": "Uno o más productos no existen."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProductoViewSet(viewsets.ModelViewSet):
    # Define el queryset predeterminado
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    # Configura el filtro de búsqueda
    filter_backends = (SearchFilter,)  
    search_fields = ('nombre',)  

    def get_queryset(self):
        queryset = super().get_queryset()

        estado = self.request.query_params.get('estado', None)
        hotel = self.request.query_params.get('hotel', None)

        if hotel and estado:
            
            if estado and estado != 'todo':
                queryset = queryset.filter(estado=estado, hotel_id=hotel)
                return queryset

            queryset = queryset.filter(hotel_id=hotel)
            return queryset
            
        return queryset


class HabitacionViewSet(viewsets.ModelViewSet):
    # Define el queryset predeterminado
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer

    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    # Configura el filtro de búsqueda
    filter_backends = (SearchFilter,)
    search_fields = ('numero','tipo','estado') 

    def get_queryset(self):
        queryset = super().get_queryset()

        estado = self.request.query_params.get('estado', None)
        hotel = self.request.query_params.get('hotel', None)

        if hotel and estado:
            
            if estado and estado != 'todo':
                queryset = queryset.filter(estado=estado, hotel_id=hotel)
                return queryset

            queryset = queryset.filter(hotel_id=hotel)
            return queryset
            
        return queryset

class HuespedViewSet(viewsets.ModelViewSet):
    queryset = Huesped.objects.all()
    serializer_class = HuespedSerializer
    permission_classes = [IsAuthenticated, PermisosVerificacion]
    authentication_classes = [TokenAuthentication]

    filter_backends = (SearchFilter,) 
    search_fields = ['nombre', 'num_documento'] 

    def get_queryset(self):
        queryset = super().get_queryset()

        estado = self.request.query_params.get('estado', None)
        hotel = self.request.query_params.get('hotel', None)

        if hotel and estado:
            
            if estado and estado != 'todo':
                queryset = queryset.filter(estado=estado, hotel_id=hotel)
                return queryset

            queryset = queryset.filter(hotel_id=hotel)
            return queryset
            
        return queryset



from rest_framework.permissions import BasePermission

class IsStaffOrSuperUser(BasePermission):
    """
    Permiso personalizado para permitir que solo los usuarios con permisos de
    `staff` o `superuser` puedan realizar acciones de escritura (POST, PUT, DELETE).
    Los usuarios normales solo podrán hacer lecturas (GET).
    """
    def has_permission(self, request, view):
        # Permite a los usuarios staff o superusuario hacer cualquier acción
        if request.user and (request.user.is_staff or request.user.is_superuser):
            return True
        # Solo permite a los usuarios autenticados ver los objetos (GET)
        if request.method == 'GET':
            return True
        return False


class HotelViewSet(viewsets.ModelViewSet):
    # Define el queryset predeterminado
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    permission_classes = [IsAuthenticated, IsStaffOrSuperUser]  # Usamos el permiso personalizado
    authentication_classes = [TokenAuthentication]

    # Configura el filtro de búsqueda
    filter_backends = (SearchFilter,)
    search_fields = ('nombre',)  # Asegúrate de poner una coma en las tuplas de un solo elemento

    def get_queryset(self):
        queryset = super().get_queryset()

        # Filtra por habitaciones activas
        estado = self.request.query_params.get('estado', None)
        print(estado, '-------------------')
        if estado == 'todo':
            queryset = queryset.all()
        elif estado is not None:
            queryset = queryset.filter(estado=estado)

        return queryset




# class HabitacionView(APIView):

#     def get_object(self, pk):
#         try:
#             return Habitacion.objects.get(pk=pk)
#         except Habitacion.DoesNotExist:
#             return None

#     def get(self, request, pk=None):
#         if pk:
#             habitacion = self.get_object(pk)
#             if habitacion:
#                 serializer = HabitacionSerializer(habitacion)
#                 return Response(serializer.data)
#             return Response({"detail": "Habitacion no encontrada"}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             habitaciones = Habitacion.objects.all()
#             if not habitaciones:
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             serializer = HabitacionSerializer(habitaciones, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = HabitacionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         habitacion = self.get_object(pk)
#         if habitacion is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = HabitacionSerializer(habitacion, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         habitacion = self.get_object(pk)
#         if habitacion is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         habitacion.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
