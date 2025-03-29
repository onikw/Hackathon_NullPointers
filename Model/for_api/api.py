from calculate_heures import calculate_hours_from_day_time
from random import randint
from sun import energy_from_sunshine

def api(energy:int,power:int,power_solar:int)->tuple:
    data=[randint(0,100) for i in range(24)]
    energy-=energy_from_sunshine(power_solar,0.8)
    return calculate_hours_from_day_time(data, energy, power)
