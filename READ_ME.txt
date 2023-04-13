Data Retrieved from https://www.slmpd.org/Crimereports.shtml
Using .csv files.

Run dataclean.py
Import .csv (example: December2020.csv)
Create new .csv for cleaned data (example: cleaned_December2020.csv)

Change line 4 to include .csv name (December2020.csv)
Change line 74 to include cleaned .csv name (cleaned_December2020.csv)
___________________________________________________________________________

Run geocoding.py (How to translate Address to X,Y Coordinates)
Import .csv (example: cleaned_december2020.csv)
Create new .csv for geocoded data (example: geocoded_December2020.csv)
Change like 5 to include .csv name
Change line 7 to new geocoded .csv name
Run program through Google Geocoding API.

__________________________________________________________________



Required Libraries for .py CSV Data Cleaning
_________________________

pandas (pip install pandas)
googlemaps (pip install googlemaps)