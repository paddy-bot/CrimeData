import pandas as pd
import googlemaps
from datetime import datetime

df = pd.read_csv('cleaned_December2020.csv', encoding='ISO-8859-1')
gmaps = googlemaps.Client(key='AIzaSyCOPgTC0YbyLnpTEaElGSvW2qa4QHbBvjg')

def geocode(address):
    try:
        geocode_result = gmaps.geocode(address)
        latitude = geocode_result[0]['geometry']['location']['lat']
        longitude = geocode_result[0]['geometry']['location']['lng']
        return latitude, longitude
    except:
        return None, None
df_lat_lng = pd.DataFrame(columns=['Latitude', 'Longitude'])

# Loop through each row in the original DataFrame and get the latitude and longitude of the address
for index, row in df.iterrows():
    address = f"{row['ILEADSAddress']}, {row['ILEADSStreet']}, St. Louis, MO"
    latitude, longitude = geocode(address)
    df_lat_lng.loc[index] = [latitude, longitude]

# Add the latitude and longitude columns to the original DataFrame
df['Latitude'] = df_lat_lng['Latitude']
df['Longitude'] = df_lat_lng['Longitude']
df.to_csv('geocoded_December2020.csv', index=False)
