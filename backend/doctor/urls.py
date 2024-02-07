from django.urls import path
from .views import DoctorListCreate, DoctorRetrieveUpdateDestroy

urlpatterns = [
    path('view/create/', DoctorListCreate.as_view(), name='doctor-list-create'),
    path('view/<int:pk>/', DoctorRetrieveUpdateDestroy.as_view(), name='doctor-retrieve-update-destroy'),
]