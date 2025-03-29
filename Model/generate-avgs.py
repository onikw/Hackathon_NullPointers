import os
import pandas as pd
import numpy as np
import json

# Ścieżki do folderów
input_folder = '/media/data/SWM_NullPointers/Model/out2'
output_folder = '/media/data/SWM_NullPointers/Model/final'

# Upewnij się, że folder output istnieje
os.makedirs(output_folder, exist_ok=True)

for file_name in os.listdir(input_folder):
    counters_for_day_of_a_week = np.zeros((7, 24), dtype=int)
    sum_for_day_of_a_week = np.zeros((7, 24), dtype=float)

    if file_name.endswith('.csv'):
        # Ścieżka do pliku wejściowego
        input_file_path = os.path.join(input_folder, file_name)
        
        # Wczytaj plik CSV
        data = pd.read_csv(input_file_path, sep=';')
        
        # Iteruj po rekordach w pliku
        for _, row in data.iterrows():
            # Odczytaj rok, dzień i godzinę z wiersza i konwertuj na int
            year = int(row['Rok'])
            day = int(row['Dzień'])
            hour = int(row['Godzina'])

            # Określ dzień tygodnia na podstawie roku i dnia
            day_of_week = pd.Timestamp(year=year, month=1, day=1) + pd.to_timedelta(day - 1, unit='D')
            day_of_week = day_of_week.dayofweek  # 0 = Monday, 6 = Sunday

            diff = row["Produkcja [MW]"] - row['Krajowe zapotrzebowanie na moc [MW]']

            # Zaktualizuj liczniki i sumy
            counters_for_day_of_a_week[day_of_week, hour] += 1
            sum_for_day_of_a_week[day_of_week, hour] += diff

    med = sum_for_day_of_a_week / counters_for_day_of_a_week

    # Przygotuj dane do zapisania w JSON
    med_dict = {
        f"day_{day_of_week}_hour_{hour}": med[day_of_week, hour]
        for day_of_week in range(7)
        for hour in range(24)
    }

    # Utwórz nazwę pliku wynikowego
    output_file_name = f"averages_{os.path.splitext(file_name)[0]}.json"
    output_file_path = os.path.join(output_folder, output_file_name)

    # Zapisz dane do pliku JSON
    with open(output_file_path, 'w') as json_file:
        json.dump(med_dict, json_file, indent=4)