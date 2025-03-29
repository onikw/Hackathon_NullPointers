import sqlite3
import json
import os

# Funkcja do pobierania danych dla zadanego miesiąca i dnia tygodnia

def get_values_for_day(month, day_of_week):
    """
    Retrieves a list of values for a specific day of the week from a dynamically named SQLite table.

    Args:
        month (int): The month number used to determine the table name (e.g., 1 for January).
        day_of_week (int): The day of the week to filter the data (e.g., 0 for Monday, 6 for Sunday).

    Returns:
        list: A list of values ordered by hour for the specified day of the week.

    Notes:
        - The function assumes the existence of a SQLite database file named 'averages_data.db'.
        - The table name is dynamically constructed as 'averages_month_<month>'.
        - The database connection is closed after the query is executed.
    """
    conn = sqlite3.connect("../Model/for_api/averages_data.db")
    cursor = conn.cursor()

    table_name = f"averages_month_{month}"  # Dynamiczna nazwa tabeli
    cursor.execute(f"""
    SELECT value FROM {table_name}
    WHERE day_of_week = ?
    ORDER BY hour
    """, (day_of_week,))
    res = [val[0] for val in cursor.fetchall()]
    conn.close()
    return res


if __name__ == "__main__":
    # Ścieżka do katalogu z plikami JSON
    json_dir_path = "../data_preprocessed/final"

    conn = sqlite3.connect("averages_data.db")
    cursor = conn.cursor()

    # Iterowanie po plikach JSON w katalogu
    for filename in os.listdir(json_dir_path):
        if filename.endswith(".json"):
            json_file_path = os.path.join(json_dir_path, filename)

            # Wyciągnięcie miesiąca z nazwy pliku
            base_name = os.path.basename(json_file_path).replace(".json", "")  # Usunięcie rozszerzenia
            month = int(base_name.split("_")[3])  # Wyciągnięcie numeru miesiąca
            table_name = f"averages_month_{month}"  # Dynamiczna nazwa tabeli

            # Tworzenie tabeli dla danego miesiąca, jeśli nie istnieje
            cursor.execute(f"""
            CREATE TABLE IF NOT EXISTS {table_name} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                day_of_week INTEGER NOT NULL,
                hour INTEGER NOT NULL,
                value REAL NOT NULL
            )
            """)

            # Wczytanie danych z pliku JSON
            with open(json_file_path, "r") as file:
                data = json.load(file)

            # Wstawianie danych do odpowiedniej tabeli
            for key, value in data.items():
                day_of_week, hour = key.split("_hour_")
                day_of_week = int(day_of_week.replace("day_", ""))  # Konwersja na int
                cursor.execute(f"""
                INSERT INTO {table_name} (day_of_week, hour, value)
                VALUES (?, ?, ?)
                """, (day_of_week, int(hour), value))

    # Zatwierdzenie zmian
    conn.commit()
    conn.close()