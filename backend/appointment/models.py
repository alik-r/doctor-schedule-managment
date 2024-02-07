from django.db import models
from doctor.models import Doctor

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, related_name="appointments" ,on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    patient_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.patient_name}'s appointment with Dr. {self.doctor.name}"