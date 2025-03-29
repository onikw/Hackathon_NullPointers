from calculate_heures import calculate_hours_from_day_time
from random import randint
from sun import energy_from_sunshine
from datetime import datetime
from dm_manager import get_values_for_day

def api(energy:int, power:int, power_solar:int) -> tuple:
    current_month = datetime.now().month  # Month from 1 to 12
    current_weekday = (datetime.now().weekday() + 1) % 7  # Weekday from 0 (Monday) to 6 (Sunday)
    
    data = get_values_for_day(current_month, current_weekday)
    energy -= energy_from_sunshine(power_solar, 0.8)

    return calculate_hours_from_day_time(data, energy, power)


if __name__ == "__main__":
    print(api(200, 30, 10))