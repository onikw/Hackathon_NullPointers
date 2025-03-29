import sys
import os

sys.path.append(os.path.abspath(".."))  # Dodaje folder nadrzędny do ścieżki


from Model.for_api.api import api

args = sys.argv[1:]


AVERAGE_CAR_BATTERY_CAPACITY = 60  # w kWh

more_cars = args["cars"]
battery_capacity = args["battery_capacity"]  # w kWh
battery_percentage = args["battery_percentage"] # w %
average_office_daily_consumption = args["monthly_consumption"]//30  # w kWh
charger_power = args["charger_power"]  # w kW
solar_power = args["solar_power"]  # w kW
remaining_energy = (battery_capacity * battery_percentage)
required_energy = average_office_daily_consumption + AVERAGE_CAR_BATTERY_CAPACITY * more_cars - remaining_energy
if required_energy > 0:
    print(f"Brakuje energii: {required_energy} kWh")
    
if args:
    print(f"Otrzymane argumenty: {', '.join(args)}")
    print(args)

    print(api(required_energy, charger_power, solar_power))
else:
    print("Brak argumentów, zwracam domyślną wiadomość.")
