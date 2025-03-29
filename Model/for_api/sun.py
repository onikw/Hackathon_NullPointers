import requests
import datetime
import numpy as np
from scipy.stats import norm

# Współrzędne geograficzne Brzegu
def get_sunshine_duration():
    latitude = 50.8600
    longitude = 17.4670

    # Data na jutro
    tomorrow = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()

    # URL API Open-Meteo
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=sunshine_duration&timezone=Europe%2FWarsaw&start_date={tomorrow}&end_date={tomorrow}"

    response = requests.get(url)
    data = response.json()

    # Pobranie liczby godzin nasłonecznienia
    sunshine_duration_seconds = data['daily']['sunshine_duration'][0]
    sunshine_duration_hours = sunshine_duration_seconds / 3600

    return sunshine_duration_hours


def energy_from_sunshine(solar_panel_power, sunshine_duration_hours):
    mu = 12
    sigma = 3

    hours = np.linspace(6, 18, 100)

    solar_power = norm.pdf(hours, mu, sigma)
    solar_power = solar_power / max(solar_power)

    solar_energy_factor = np.trapezoid(solar_power, hours)

    return solar_panel_power * sunshine_duration_hours * solar_energy_factor


print(energy_from_sunshine(5, get_sunshine_duration()))