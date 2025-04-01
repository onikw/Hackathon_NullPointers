# Hackathon_NullPointers

## Energy Storage Optimization System

Hackathon_NullPointers is an intelligent energy management application that optimizes battery storage charging based on weather forecasts, renewable energy production estimates, and energy price predictions. The system helps users maximize the use of renewable energy while minimizing electricity costs.

## Preview
![image](https://github.com/user-attachments/assets/46b1dd66-6608-49b1-ae20-c6d713a95170)
![image](https://github.com/user-attachments/assets/ef857925-2f04-481f-a00c-7e189e5a9a4b)




## Features

- **Smart Battery Charging Scheduler**: Determines optimal charging windows based on multiple factors
- **Weather-Based Solar Production Estimation**: Forecasts renewable energy availability
- **Energy Price Prediction**: Analyzes and predicts electricity prices throughout the day
- **Customizable Energy Requirements**: Accounts for battery capacity, office consumption, and EV charging
- **Visual Analytics**: Interactive charts and visualizations for energy usage and cost analysis

## Project Structure

```
Hackathon_NullPointers/
├── Model/                  # ML models and data preprocessing
│   └── data_preprocessed/  # Scripts for data preparation and analysis
├── NullPointersFront/      # React+TypeScript frontend application
│   └── src/                # Frontend source code
└── NullPointersServer/     # Backend server for processing and API
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

#### Backend Setup

1. Set up Python environment:
   ```bash
   cd NullPointersServer
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Prepare the model:
   ```bash
   cd ../Model
   python -m data_preprocessed.generate-avgs
   ```

#### Frontend Setup

1. Install dependencies:
   ```bash
   cd ../NullPointersFront
   npm install
   ```

## Usage

1. Start the backend server:
   ```bash
   cd NullPointersServer
   python app.js
   ```

2. Start the frontend development server:
   ```bash
   cd NullPointersFront
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## How It Works

1. **Data Collection**: The system gathers weather forecasts and electricity price data
2. **Energy Analysis**: Calculates expected solar energy production and electricity price fluctuations
3. **Optimization**: Determines the most cost-effective and environmentally friendly charging schedule
4. **Visualization**: Presents results through interactive charts showing optimal charging times

## Technologies

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Python, Node.js
- **Data Processing**: Python (Pandas, NumPy)
- **Visualization**: Data visualization libraries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
