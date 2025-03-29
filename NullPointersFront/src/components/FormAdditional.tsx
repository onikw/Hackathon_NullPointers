import React from "react";
import axios from "axios";
import InputComponent from "./InputComponent.tsx";
import { useFormContext } from "../contexts/FormContext.tsx";

export default function FormAdditional() {
  const { input, additional, setAdditional } = useFormContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/sendData", input);
      if (response.status === 200) {
        alert('Dane zostały zapisane pomyślnie');
        const data = response.data;
        console.log(data.data)
      }
    } catch (error) {
      alert('Błąd podczas zapisywania danych');
    }
  };

  return (
    <div className="battery-container border-4 border-gray-300 rounded-lg pt-2 pb-8 px-4 bg-gray-700 relative">
      {/* Górna część baterii (kapsel) */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-gray-500 border-2 border-gray-300 rounded-t-md"></div>

      <h2 className="font-bold text-lg mb-6 text-center text-green-400">Bateria</h2>

      {/* Wskaźniki naładowania baterii */}
      <div className="flex justify-between mb-4 px-2">
        <div className="w-full h-3 bg-green-400 rounded-full mb-1"></div>
      </div>
      <div className="flex justify-between mb-4 px-2">
        <div className="w-3/4 h-3 bg-green-400 rounded-full mb-1"></div>
      </div>
      <div className="flex justify-between mb-4 px-2">
        <div className="w-1/2 h-3 bg-green-400 rounded-full mb-1"></div>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <InputComponent disabled={false} name="batteryCapacity" title="Pojemność magazynu energii" />
        <InputComponent disabled={false} title={"Procent naładowania energii"} name={"batteryPercentage"} />
        <InputComponent disabled={false} title={"Miesięczne zużycie energi"} name={"monthlyUsage"} />
        <InputComponent disabled={false} title={"Moc źródła energii"} name={"sourcePower"} />

        {/* Checkbox z dodatkowymi opcjami */}

        <div className="my-5 flex items-center">
          <input
            type="checkbox"
            id="additional"
            name="additional"
            checked={additional}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            onChange={() => setAdditional(prev => !prev)}
          />
          <label htmlFor="additional" className="ml-2 text-sm font-medium">Ogniwa fotowoltaiczne</label>
        </div>

        {additional && (
          <InputComponent disabled={false} title={"Moc źródła energii słonecznej"} name={"solarPower"} />
        )}

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
          type="submit">Oblicz
        </button>
      </form>
    </div>
  );
}