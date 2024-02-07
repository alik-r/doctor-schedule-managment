from django.urls import path
from .views import AppointmentListCreate, AppointmentRetrieveUpdateDestroy

from . import api

urlpatterns = [
    path('', api.appointment_list, name='appointment-list'),
    path('<int:pk>/', api.appointment_detail, name='appointment-detail'),
    path('update/<int:pk>/', api.appointment_update, name='appointment-update'),
    path('create/', api.appointment_create, name='appointment-create'),
    path('delete/<int:pk>/', api.appointment_delete, name='appointment-delete'),
    path('view/create/', AppointmentListCreate.as_view(), name='appointment-list-create'),
    path('view/<int:pk>/', AppointmentRetrieveUpdateDestroy.as_view(), name='appointment-retrieve-update-destroy'),
]