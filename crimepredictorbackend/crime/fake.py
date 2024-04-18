import csv
import random
from datetime import datetime, timedelta
from geopy.distance import geodesic

# Function to generate random latitude and longitude coordinates within Meru, Kenya's bounds
def generate_coordinates():
    # Meru's approximate bounds
    min_lat, max_lat = 0.0415, 0.0615  # Adjusted min and max latitude
    min_long, max_long = 37.6356, 37.6556  # Adjusted min and max longitude
    return round(random.uniform(min_lat, max_lat), 6), round(random.uniform(min_long, max_long), 6)

# Function to calculate distance between two points using geodesic distance
def calculate_distance(point1, point2):
    return geodesic(point1, point2).kilometers

# Define the coordinates of a bank in Meru
bank_location = (0.0459849, 37.652118)  # Example coordinates of a bank

# List of crime types
crime_types = ['Theft', 'Robbery', 'Assault', 'Burglary', 'Fraud', 'Kidnapping', 'Murder', 'Drug-related']

# Generate synthetic crime data within the bounds of Meru, Kenya
crime_data = []
start_date = datetime(2013, 1, 1)
end_date = datetime.now()

for _ in range(1000):
    crime_date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    crime_time = datetime.strptime(f"{random.randint(0, 23):02d}:{random.randint(0, 59):02d}", "%H:%M")
    crime_type = random.choice(crime_types)
    latitude, longitude = generate_coordinates()
    
    # Simulate proximity to bank
    crime_location = (latitude, longitude)
    proximity_to_bank = calculate_distance(crime_location, bank_location)
    
    crime = {
        'year': crime_date.year,
        'month': crime_date.month,
        'day': crime_date.day,
        'time': crime_time.strftime("%H:%M"),
        'proximity_to_bank': proximity_to_bank,
        'type': crime_type,
        'latitude': latitude,
        'longitude': longitude
    }
    crime_data.append(crime)

# Output the dataset as CSV
csv_columns = ['year', 'month', 'day', 'time', 'proximity_to_bank', 'type', 'latitude', 'longitude']
csv_file = 'meru_crime_data.csv'

with open(csv_file, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
    writer.writeheader()
    for crime in crime_data:
        writer.writerow(crime)
