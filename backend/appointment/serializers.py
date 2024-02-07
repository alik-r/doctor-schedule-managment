from rest_framework import serializers
from .models import Appointment
from doctor.models import Doctor

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'date', 'start_time', 'end_time', 'patient_name']

    def validate(self, data):
        doctor_id = data.get('doctor')
        date = data.get('date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')

        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            raise serializers.ValidationError("Doctor with the provided ID does not exist.")

        conflicting_appointments = Appointment.objects.filter(
            doctor=doctor,
            date=date,
            start_time__lt=end_time,
            end_time__gt=start_time
        )
        if conflicting_appointments.exists():
            raise serializers.ValidationError("The doctor is not available during the specified time slot.")

        return data
