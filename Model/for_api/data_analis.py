import json
import datetime
import os

def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def load_current_energy_prices(file_dir=None):
    """
    Load energy prices for the current day of the week from the current month's data file.
    Day 0 = Monday, Day 6 = Sunday
    """
    # Get current date information
    current_date = datetime.datetime.now()
    
    # Format month as "_01", "_02", etc.
    month_format = f"_{current_date.month:02d}"
    
    # Get day of week (0 = Monday, 6 = Sunday)
    day_of_week = current_date.weekday()
    
    # Construct file path
    if file_dir is None:
        # Default to the 'final' directory relative to the script location
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_dir = os.path.join(os.path.dirname(script_dir), "final")
    
    json_filename = f"averages_processed_data{month_format}.json"
    json_file_path = os.path.join(file_dir, json_filename)
    
    try:
        with open(json_file_path, 'r') as file:
            all_data = json.load(file)
            
        # Filter data for current day of week
        day_data = {key: value for key, value in all_data.items() if key.startswith(f"day_{day_of_week}")}
        
        # Extract only the hourly values in a list
        hourly_prices = [value for key, value in sorted(day_data.items())]
        
        return hourly_prices
    except FileNotFoundError:
        print(f"Error: File '{json_file_path}' not found")
    except json.JSONDecodeError:
        print(f"Error: File '{json_file_path}' contains invalid JSON")
    except Exception as e:
        print(f"Error: {str(e)}")
    return None

# Example usage
if __name__ == "__main__":
    # Replace with your actual JSON file path
    json_file_path = "path/to/your/file.json"
    data = load_json_file(json_file_path)
    print(data)  # Now you can work with the data

    prices = load_current_energy_prices()
    if prices:
        print(f"Energy prices for today: {prices}")
        print(f"Today is day {datetime.datetime.now().weekday()} of the week (0=Monday, 6=Sunday)")
    else:
        print("Failed to load energy prices.")