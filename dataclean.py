import pandas as pd

# Read in the CSV file with the appropriate encoding
df = pd.read_csv('December2020.csv', encoding='ISO-8859-1')

# Select only the columns of interest
columns_of_interest = ['Complaint', 'DateOccur', 'Crime', 'Description', 'ILEADSAddress', 'ILEADSStreet']
df = df[columns_of_interest]

# Convert the ILEADSAddress column to string and remove the '.0'
df['ILEADSAddress'] = df['ILEADSAddress'].astype(str).apply(lambda x: x.rstrip('.0'))

# Create a function to map crime codes to generic categories
def map_category(crime_code, description):
    if crime_code >= 10000 and crime_code < 20000:
        return 'Homicide'
    elif crime_code >= 20000 and crime_code < 30000:
        if 'SEXUAL' in description or 'RAPE' in description:
            return 'Rape'
        else:
            return 'Other Sexual Offense'
    elif crime_code >= 30000 and crime_code < 40000:
        if 'CARJACKING' in description or 'ARMED' in description:
            return 'Armed Robbery'
        elif 'WEAPON' in description or 'FIREARM' in description:
            return 'Weapons Offense'
        else:
            return 'Robbery'
    elif crime_code >= 40000 and crime_code < 50000:
        if 'AGGRAVATED' in description or ('FIREARM' in description and 'SIMPLE' not in description) or ('WEAPON' in description and 'SIMPLE' not in description):
            return 'Aggravated Assault'
        elif 'SIMPLE' in description:
            return 'Simple Assault'
        else:
            return 'Other Assault'
    elif crime_code >= 50000 and crime_code < 60000:
        if 'FORCIBLE ENTRY' in description or 'UNLAWFUL ENTRY' in description:
            return 'Breaking and Entering'
        else:
            return 'Burglary'
    elif crime_code >= 60000 and crime_code < 70000:
        return 'Larceny'
    elif crime_code >= 70000 and crime_code < 80000:
        if 'AUTO THEFT' in description:
            return 'Motor Vehicle Theft'
        else:
            return 'Other Theft'
    elif crime_code >= 80000 and crime_code < 90000:
        return 'Arson'
    elif 'DRUGS' in description:
        if 'POSSESSION' in description:
            return 'Drug Possession'
        elif 'SALES' in description or 'TRAFFICKING' in description:
            return 'Drug Sales/Trafficking'
        else:
            return 'Other Drug Offense'
    elif 'WEAPON' in description or 'FIREARM' in description:
        return 'Weapons Offense'
    elif 'FRAUD' in description:
        return 'Fraud'
    elif 'DESTRUCTION OF PROPERTY' in description:
        return 'Destruction of Property'
    elif 'SIMPLE ASSAULT' in description:
        return 'Simple Assault'
    else:
        return 'Other Crime'



# Map crime codes to generic categories using the map_category function
df['Generic Crime'] = df.apply(lambda row: map_category(row['Crime'], row['Description']), axis=1)

# Output the cleaned data with generic categories to a new CSV file
df.to_csv('cleaned_December2020.csv', index=False)
