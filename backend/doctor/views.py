from rest_framework import generics
from .models import Doctor
from .serializers import DoctorSerializer

class DoctorListCreate(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer 

class DoctorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer