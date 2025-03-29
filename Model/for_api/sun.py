import numpy as np
from scipy.stats import norm
import requests
import datetime

def get_sunshine_data():
    latitude = 50.8600
    longitude = 17.4670
    
    # Data na jutro
    tomorrow = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()
    
    # URL API Open-Meteo z godzinowym nasłonecznieniem
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=shortwave_radiation&timezone=Europe%2FWarsaw&start_date={tomorrow}&end_date={tomorrow}"
    
    response = requests.get(url)
    data = response.json()
    
    # Pobranie listy godzin i wartości nasłonecznienia
    hours = data['hourly']['time']
    radiation = data['hourly']['shortwave_radiation']  # W W/m²
    
    return hours, radiation

def energy_from_sunshine(solar_panel_power):
    hours, radiation = get_sunshine_data()
    
    # Przekształcenie mocy promieniowania na energię
    energy_produced = 0
    for rad in radiation:
        power_output = solar_panel_power * (rad / 1000)  # Przeliczenie W/m² na kW/m²
        energy_produced += power_output / 2  # Średnia moc w ciągu każdej 30-minutowej próbki
    
    return energy_produced

