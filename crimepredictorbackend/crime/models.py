from django.db import models

# Create your models here.

class CrimePrediction(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    true_type = models.CharField(max_length=100)
    predicted_type = models.CharField(max_length=100)

    def __str__(self):
        return f"Prediction: {self.true_type} (True) / {self.predicted_type} (Predicted)"