from django.urls import path,include
from rest_framework_nested import routers
from . import  views



router = routers.DefaultRouter()

router.register('predictions' , views.CrimePredictionViewSet , basename='predictions')

urlpatterns = router.urls 
