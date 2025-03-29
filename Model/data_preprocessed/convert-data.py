import pandas as pd
import os
from glob import glob

# Ścieżki do folderów
input_dir = "/media/data/SWM_NullPointers/Model/data/"
output_dir = "/media/data/SWM_NullPointers/Model/out/"

# Pobierz listę wszystkich plików CSV w folderze `data`
input_files = glob(os.path.join(input_dir, "*.csv"))

# Przetwarzaj każdy plik z folderu `data`
for input_file in input_files:
    print(f"Przetwarzanie pliku: {input_file}")
    
    # Wczytaj dane z pliku CSV, używając separatora ";"
    data = pd.read_csv(input_file, sep=";")
    
    # Wyciągnij miesiąc i dzień z kolumny "Doba handlowa"
    data["Rok"] = pd.to_datetime(data["Doba handlowa"]).dt.year
    data["Miesiąc"] = pd.to_datetime(data["Doba handlowa"]).dt.month
    data["Dzień"] = pd.to_datetime(data["Doba handlowa"]).dt.day
    
    # Wybierz tylko wymagane kolumny
    processed_data = data[["Rok", "Miesiąc", "Dzień", "Godzina", "Krajowe zapotrzebowanie na moc [MW]"]]
    
    # Znajdź unikalne miesiące w danych
    unique_months = processed_data["Miesiąc"].unique()
    
    # Przetwarzaj dane dla każdego unikalnego miesiąca
    for month in unique_months:
        # Filtruj dane dla danego miesiąca
        month_data = processed_data[processed_data["Miesiąc"] == month]
        
        # Usuń kolumnę "Miesiąc" przed zapisaniem
        month_data = month_data.drop(columns=["Miesiąc"])
        
        # Utwórz nazwę pliku na podstawie numeru miesiąca
        output_file = f"{output_dir}processed_data_{month:02d}.csv"
        
        if os.path.exists(output_file):
            # Jeśli plik istnieje, wczytaj istniejące dane
            existing_data = pd.read_csv(output_file, sep=";")
            
            # Połącz dane i posortuj według kolumny "Rok", "Dzień" oraz "Godzina"
            combined_data = pd.concat([existing_data, month_data])
            combined_data = combined_data.sort_values(by=["Rok", "Dzień", "Godzina"]).reset_index(drop=True)
            
            # Zapisz połączone dane do pliku
            combined_data.to_csv(output_file, index=False, sep=";")
            print(f"Dane dla miesiąca {month:02d} zostały zaktualizowane w pliku: {output_file}")
        else:
            # Jeśli plik nie istnieje, zapisz dane jako nowy plik
            month_data.to_csv(output_file, index=False, sep=";")
            print(f"Dane dla miesiąca {month:02d} zapisano do nowego pliku: {output_file}")