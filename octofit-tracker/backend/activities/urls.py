from django.urls import path
from .views import ActivityListCreateAPI

urlpatterns = [
    path('', ActivityListCreateAPI.as_view(), name='activity-list-create'),
]
