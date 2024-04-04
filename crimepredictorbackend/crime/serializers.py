
from rest_framework import  serializers
from .models import CrimePrediction


class CrimePredictionSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    month = serializers.IntegerField()
    day = serializers.IntegerField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    def to_representation(self, instance):
        return {
            'predicted_type': instance['type'],  # Assuming 'type' is the predicted crime type
        }