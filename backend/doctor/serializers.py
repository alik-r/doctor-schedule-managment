from rest_framework import serializers
from .models import Doctor
from appointment.serializers import AppointmentSerializer

class DoctorSerializer(serializers.ModelSerializer):
    appointments = AppointmentSerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'appointments']