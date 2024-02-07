from datetime import datetime
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import AppointmentSerializer
from .models import Appointment

@api_view(['GET'])
@permission_classes([])
@authentication_classes([])
def appointment_list(request):
    date_str = request.query_params.get('date', None)
    appointments = None

    if date_str:
        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            appointments = Appointment.objects.filter(date=date)
            serializer = AppointmentSerializer(appointments, many=True)
            return JsonResponse(serializer.data, safe=False)
        except ValueError:
            return JsonResponse({'message': 'Invalid date format. Please use YYYY-MM-DD.'}, status=400)
    else:
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return JsonResponse(serializer.data, safe=False)
    
@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
def appointment_create(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([])
@authentication_classes([])
def appointment_detail(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    serializer = AppointmentSerializer(appointment)
    return JsonResponse(serializer.data)

@api_view(['PUT'])
@permission_classes([])
@authentication_classes([])
def appointment_update(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([])
@authentication_classes([])
def appointment_delete(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    appointment.delete()
    return JsonResponse({'message': 'appointment deleted successfully'}, status=204)