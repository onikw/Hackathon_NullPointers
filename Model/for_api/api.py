from calculate_heures import calculate_hours_from_day_time
from random import randint

def api(energy:int,power:int):
    data=[randint(0,100) for i in range(24)]

    return calculate_hours_from_day_time(data, energy, power)
