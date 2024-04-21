from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from sklearn.pipeline import Pipeline
import joblib
from django.core.mail import send_mail
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives
import pandas as pd
from .models import CrimePrediction
from .serializers import CrimePredictionSerializer
import os
from geopy.distance import geodesic

from django.conf import settings
from django.template.loader import render_to_string
from dotenv import load_dotenv
from django.contrib.auth.models import User
from rest_framework import status

# Create your views here.
class CrimePredictionViewSet(viewsets.ModelViewSet):
    queryset = CrimePrediction.objects.all()
    serializer_class = CrimePredictionSerializer
    
    @action(detail=False, methods=['post'])
    def predict_crime(self, request):
        print("DATA =>>" , request.data)
        input_serializer = CrimePredictionSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        input_data = input_serializer.validated_data

        # Load the trained Random Forest model from the pickle file
        script_dir = os.path.dirname(__file__)

        # Load the model using the full path
        model_path = os.path.join(script_dir, 'random_forest_model.pkl')
        model = joblib.load(model_path)
        # Predict using the loaded model
        input_df = pd.DataFrame([input_data])
        input_df[['year' , 'month' , 'day']] = input_df[['year' , 'month' , 'day']].astype('int64')
        input_df[['latitude' , 'longitude' ]] = input_df[['latitude' , 'longitude' ]].astype("float64")
        predictions = None
        
        try:
          predictions = model.predict(input_df)
            
        except Exception as e:
            print("EXCEPTIO HERE")
            
            
    
        

        # result_df = pd.DataFrame({
        #             'type': predictions,
        #             })
        input_df['type'] = predictions
        result_df = input_df
        bank_location = (0.0459849, 37.652118)
        
        # Simulate proximity to bank
        # crime_location = (result_df.latitude, result_df.longitude)
        
        # proximity_to_bank = calculate_distance(crime_location, bank_location)
        result_df['proximity_to_bank'] = 1.9
        print(result_df)
        # pipeline = Pipeline([("DecodeCrimeType" , DecodeCrimeType(column='type')) ])


        # result_df = pipeline.fit_transform(result_df)
        # Prepare the response data
        results ={
                   'predicted_type': result_df['type'],
        }

        return Response(results)
    

    @action(detail=False, methods=['post'])
    def send_mail(self, request , pk=None):
        print("PAYLOAD =>>",  self.request.data)
        mail_host_user = getattr(settings, "EMAIL_HOST_USER", None)
        prediction = request.data.get('prediction')
        print("Predictions = " , prediction)


        # Render the email content using the template
        email_subject = 'Model Results'
        email_text_content = 'Model Results'
        email_html_content = render_to_string('emails/results.html', {'prediction': prediction})

        receiver_id = request.data.get('receiver')
        receiver = User.objects.get(pk=receiver_id)

        recipient_email = receiver.email
        # Send the email
        if recipient_email:
            msg = EmailMultiAlternatives(email_subject,email_text_content, mail_host_user, [recipient_email])
            msg.attach_alternative(email_html_content, "text/html")  # Specify that the content is HTML
            msg.send()
            # invitation = Invitation(sender=request.user, receiver=receiver, event=event)
            # invitation.save()
            

            return Response({'message' : "Results sent succesfully"})
        else:
            return Response({'error': 'Recipient email not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
# def calculate_distance(point1, point2):
#     return geodesic(point1, point2).kilometers    
def calculate_distance(point1, point2):
    # Extract latitude and longitude values from point1 and point2
    lat1, lon1 = point1
    lat2, lon2 = point2
    return geodesic((lat1, lon1), (lat2, lon2)).kilometers   
    
from sklearn.preprocessing import LabelEncoder
from sklearn.base import BaseEstimator, TransformerMixin

class DecodeCrimeType(BaseEstimator, TransformerMixin):
    """
    This class decodes numerical values in the specified column into their original categorical values.
    """
    def __init__(self, column):
        self.column = column
        self.encoder = LabelEncoder()

    def fit(self, X, y=None):
        # Fit the LabelEncoder on the specified column
        self.encoder.fit(X[self.column])
        return self




    def transform(self, X):
        # Transform the specified column using LabelEncoder
        X[self.column] = self.encoder.inverse_transform(X[self.column])
        return X    