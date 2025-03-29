import os
import pandas as pd
import numpy as np

# Ścieżki do folderów
input_folder = '/media/data/SWM_NullPointers/Model/out'
output_folder = '/media/data/SWM_NullPointers/Model/out2'

# Upewnij się, że folder output istnieje
os.makedirs(output_folder, exist_ok=True)

# Funkcja do obliczenia godzin słonecznych w zależności od miesiąca
def get_sunny_hours(month):
    if month in [5, 6, 7, 8]:  # Miesiące letnie
        return range(5, 21)  # 5:00 - 20:59
    elif month in [3, 4, 9, 10]:  # Wiosna i jesień
        return range(6, 19)  # 6:00 - 18:59
    else:  # Miesiące zimowe
        return range(7, 17)  # 7:00 - 16:59

# Funkcja do obliczenia różnicy w zależności od miesiąca i godziny
def calculate_difference(day, hour, month):
    sunny_hours = get_sunny_hours(month)
    max_diff_summer = 5000      # Maksymalna różnica dla miesięcy letnich
    min_diff_winter = 1000      # Minimalna różnica dla miesięcy zimowych

    # Współczynnik liniowy dla miesięcy (05-08: letnie, reszta: zimowe)
    if month in [5, 6, 7, 8]:
        seasonal_factor = max_diff_summer
    else:
        seasonal_factor = min_diff_winter + (max_diff_summer - min_diff_winter) * (4 - abs(5 - month)) / 4

    # Dodatkowa różnica w godzinach słonecznych
    if hour in sunny_hours:
        return seasonal_factor
    else:
        return seasonal_factor * 0.5

# Przetwarzanie każdego pliku w folderze
for file_name in os.listdir(input_folder):
    if file_name.endswith('.csv'):
        # Ścieżka do pliku wejściowego
        input_file_path = os.path.join(input_folder, file_name)
        
        # Wczytaj plik CSV
        data = pd.read_csv(input_file_path, sep=';')

        # Wyciągnij numer miesiąca z nazwy pliku
        try:
            month = int(file_name.split('_')[-1].split('.')[0])
        except ValueError:
            print(f"Nie można wyciągnąć numeru miesiąca z pliku: {file_name}")
            continue

        # Dodaj kolumnę "Produkcja [MW]"
        np.random.seed(42)  # Ustawienie ziarna dla powtarzalności
        data['Produkcja [MW]'] = data.apply(
            lambda row: row['Krajowe zapotrzebowanie na moc [MW]'] + 
                        calculate_difference(row['Dzień'], row['Godzina'], month) + 
                        np.random.normal(0, 200),  # Szum losowy
            axis=1
        )

        # Ścieżka do pliku wyjściowego
        output_file_path = os.path.join(output_folder, file_name)
        
        # Zapisz wynik do nowego pliku
        data.to_csv(output_file_path, sep=';', index=False)
        print(f"Przetworzono plik: {file_name} -> {output_file_path}")