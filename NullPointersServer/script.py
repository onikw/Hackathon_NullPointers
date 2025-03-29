import sys
import os
from plot import create_analysis_chart 

sys.path.append(os.path.abspath(".."))  # Dodaje folder nadrzędny do ścieżki


from Model.for_api.api import api

args = sys.argv[1:]
args = args[0]
print(args)
print(type(args))
AVERAGE_CAR_BATTERY_CAPACITY = int(args["usageAmount"])  # w kWh


more_cars = int(args["carAmount"]) ## OPTIONAL
battery_capacity = int(args["batteryCapacity"])  # w kWh
battery_percentage = int(args["batteryPercentage"]) # w %
average_office_daily_consumption = int(args["monthlyUsage"])//30  # w kWh
charger_power = int(args["sourcePower"])  # w kW
solar_power = int(args["solorPower"])  # w kW
remaining_energy = (battery_capacity * battery_percentage)
required_energy = average_office_daily_consumption + AVERAGE_CAR_BATTERY_CAPACITY * more_cars - remaining_energy
if required_energy > 0:
    print(f"Brakuje energii: {required_energy} kWh")
    
if args:
    print(f"Otrzymane argumenty: {', '.join(args)}")
    print(args)

    print(api(required_energy, charger_power, solar_power))
    create_analysis_chart(required_energy, charger_power, solar_power)
else:
    print("Brak argumentów, zwracam domyślną wiadomość.")

# Odpowiedź z Pythona: Figure(1400x800)
# {"batteryCapacity":"312312","batteryPercentage":"12312","carAmount":"123","monthlyUsage":"333","sourcePower":"1123","solarPower":"31","usageAmount":"33"}
# <class 'str'>
