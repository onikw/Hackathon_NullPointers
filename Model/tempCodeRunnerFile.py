def calculate_hours_from_day_time(data, energy, max_power):
    hours_needed = energy / max_power
    whole_hours = int(hours_needed)
    remaining_minutes = int((hours_needed - whole_hours) * 60)
    
    if whole_hours > 0:
        start_idx, end_idx = most_expensive_segment(data, whole_hours)
        
        # If there are remaining minutes, find the best segment for those minutes
        if remaining_minutes > 0:
            minutes_segment_length = remaining_minutes // 15  # Convert minutes to 15-minute intervals
            best_start_minute = None
            best_minute_sum = float('-inf')
            
            for i in range(len(data) - minutes_segment_length + 1):
                current_sum = sum(data[i:i + minutes_segment_length])
                if current_sum > best_minute_sum:
                    best_minute_sum = current_sum
                    best_start_minute = i
            
            return ((start_idx, 0), (end_idx, 0), (best_start_minute, remaining_minutes))
        else:
            return ((start_idx, 0), (end_idx, 0))
    else:
        # For less than one hour, find the best segment for the given minutes
        minutes_segment_length = remaining_minutes // 15  # Convert minutes to 15-minute intervals
        best_start_minute = None
        best_minute_sum = float('-inf')
        
        for i in range(len(data) - minutes_segment_length + 1):
            current_sum = sum(data[i:i + minutes_segment_length])
            if current_sum > best_minute_sum:
                best_minute_sum = current_sum
                best_start_minute = i
        
        return ((best_start_minute, 0), (best_start_minute, remaining_minutes))

print(calculate_hours_from_day_time(test_data, 651, 100))