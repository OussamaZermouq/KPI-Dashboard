from django.urls import path
from .views import ExcelToJsonView

urlpatterns = [
    path('', ExcelToJsonView.as_view(), name='excel-to-json'),
]
