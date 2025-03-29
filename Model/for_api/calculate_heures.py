import sys
from pathlib import Path

# Add the parent directory of the current file to the system path
current_file = Path(__file__).resolve()
parent_directory = current_file.parent.parent
sys.path.append(str(parent_directory))

from create_db import get_values_for_day

def most_expensive_segment(array, length):
    n = len(array)
    array = array + array[:length-1]  # Extend the array to simulate circular behavior
    
    max_sum = sum(array[:length])  # Sum of the initial segment
    max_index = 0
    current_sum = max_sum
    
    for i in range(1, n):
        current_sum = current_sum - array[i - 1] + array[i + length - 1]
        if current_sum > max_sum:
            max_sum = current_sum
            max_index = i
    
    return max_index % n, (max_index + length - 1) % n  # Return start and end indices

def calculate_hours_from_day_time(data, energy, max_power):
    hours_needed = energy / max_power
    if hours_needed >= len(data):
        return (0,0),(24,0)
    whole_hours = int(hours_needed)
    remaining_minutes = int((hours_needed - whole_hours) * 60) // 15 * 15
    
    if whole_hours > 0:
        start_idx, end_idx = most_expensive_segment(data, whole_hours)

        if remaining_minutes > 0:
            if data[start_idx-1]<data[(end_idx+1)%len(data)]:
                return ((start_idx, 0), (end_idx+1, remaining_minutes))
            else:
                return ((start_idx-1, 60-remaining_minutes), (end_idx+1, 0))
        else:
            return ((start_idx, 0), (end_idx+1, 0))

#calculate_hours_from_day_time(data, energy, max_power)
# data: list[int], energy: int kWh, max_power: int kW
#return ((start_hour, start_minute), (end_hour, end_minute))