import sys
import os

sys.path.append(os.path.abspath(".."))  # Dodaje folder nadrzędny do ścieżki


import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime, timedelta
from Model.for_api.dm_manager import get_values_for_day
from Model.for_api.sun import get_sunshine_data
from Model.for_api.calculate_heures import (
    calculate_hours_from_day_time,
    most_expensive_segment,
)
import matplotlib.dates as mdates
import matplotlib.style as style


def create_analysis_chart(energy_needed, max_power, solar_panel_power):
    plt.style.use("seaborn-v0_8-whitegrid")

    current_month = datetime.now().month
    current_weekday = (datetime.now().weekday() + 1) % 7

    price_data = get_values_for_day(current_month, current_weekday)

    hours_raw, radiation = get_sunshine_data()

    hours = list(range(24))

    solar_production = [solar_panel_power * (rad / 1000) for rad in radiation]
    total_solar_energy = sum(solar_production)

    grid_energy = max(0, energy_needed - total_solar_energy)

    start, end = calculate_hours_from_day_time(price_data, grid_energy, max_power)

    display_prices = [0.7 - price / 10000 for price in price_data]

    fig, ax1 = plt.subplots(figsize=(14, 8), dpi=100)

    ax1.step(
        hours,
        display_prices,
        color="#1f77b4",
        linewidth=2.5,
        label="Cena energii",
        where="post",
    )

    ax1.set_xlabel("Godzina dnia", fontsize=12, fontweight="bold")
    ax1.set_ylabel("Cena (PLN/kWh)", fontsize=12, fontweight="bold", color="#1f77b4")
    ax1.tick_params("y", colors="#1f77b4")
    ax1.set_xlim(0, 23)
    ax1.set_xticks(range(0, 24, 1))

    ax1.grid(False)
    ax1.yaxis.grid(True, linestyle="--", alpha=0.7)

    ax2 = ax1.twinx()
    ax2.plot(
        hours,
        solar_production,
        color="#FDC200",
        linewidth=2.5,
        label="Produkcja energii z PV",
    )
    ax2.fill_between(hours, solar_production, alpha=0.2, color="#FDC200")
    ax2.set_ylabel("Moc (kW)", fontsize=12, fontweight="bold", color="#FDC200")
    ax2.tick_params("y", colors="#FDC200")

    start_hour = start[0] + start[1] / 60
    end_hour = end[0] + end[1] / 60

    if end_hour < start_hour:
        end_hour += 24

    charging_x = []
    charging_hours = np.arange(start_hour, end_hour, 0.01)
    for h in charging_hours:
        charging_x.append(h % 24)

    min_price = min(display_prices)
    max_price = max(display_prices)
    price_range = max_price - min_price

    ax1.fill_between(
        charging_x,
        min_price - 0.05 * price_range,
        max_price + 0.05 * price_range,
        color="#18C902",
        alpha=0.2,
        label="Okres ładowania",
    )

    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(
        lines1 + lines2,
        labels1 + labels2,
        loc="upper left",
        fontsize=10,
        framealpha=0.9,
    )

    plt.title(
        f"Analiza optymalizacji energii\nWymagane: {energy_needed} kWh, Z fotowoltaiki: {total_solar_energy:.2f} kWh, Z sieci: {grid_energy:.2f} kWh",
        fontsize=14,
        fontweight="bold",
        pad=20,
    )

    ax1.grid(True, linestyle="--", alpha=0.7)

    charging_duration = end_hour - start_hour
    avg_price_during_charging = (
        sum([display_prices[int(h) % 24] for h in charging_x]) / len(charging_x)
        if charging_x
        else 0
    )
    avg_price_overall = sum(display_prices) / len(display_prices)
    savings_percent = (
        (1 - avg_price_during_charging / avg_price_overall) * 100
        if avg_price_overall > 0
        else 0
    )

    summary = (
        f"Okno ładowania: {start[0]:02d}:{start[1]:02d} do {end[0]:02d}:{end[1]:02d}\n"
        f"Czas trwania: {charging_duration:.2f} godz.\n"
        f"Średnia cena podczas ładowania: {avg_price_during_charging:.4f} PLN/kWh\n"
        f"Oszczędności: {savings_percent:.1f}%"
    )

    plt.figtext(
        0.16,
        0.16,
        summary,
        bbox=dict(
            facecolor="white", edgecolor="#1f77b4", boxstyle="round,pad=0.8", alpha=0.9
        ),
        fontsize=11,
    )

    plt.tight_layout()
    plt.savefig("analiza_energii.png", dpi=300, bbox_inches="tight")
    return fig


print(create_analysis_chart(200, 50, 10))
