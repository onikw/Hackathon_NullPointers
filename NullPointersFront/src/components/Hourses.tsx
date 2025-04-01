import { useState, useEffect } from 'react';
import { FaClockRotateLeft, FaBolt, FaChartLine } from 'react-icons/fa6';
import { useFormContext } from '../contexts/FormContext';

export default function Hourses() {
  const [optimalHours, setOptimalHours] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { result } = useFormContext();

  useEffect(() => {
    if (!result || !result.data) {
      setOptimalHours([]);
      return;
    }

    setLoading(true);

    try {
      // Przetwarzanie danych z serwera
const processData = () => {
  let hours: string[] = [];

  console.log("Surowe dane z serwera:", result.data);
  console.log("Typ danych:", typeof result.data);

  try {
    if (typeof result.data === 'string') {
      // Obsługa formatu ((H,m),(H,m))
      const regex = /\(\((\d+),\s*(\d+)\),\s*\((\d+),\s*(\d+)\)\)/g;
      const matches = [...result.data.matchAll(regex)];

      if (matches.length > 0) {
        hours = matches.map(match => {
          const startHour = parseInt(match[1]);
          const startMinute = parseInt(match[2]);
          const endHour = parseInt(match[3]);
          const endMinute = parseInt(match[4]);

          // Formatowanie czasu do HH:MM
          const formatTime = (h: number, m: number) =>
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

          return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
        });
      } else if (result.data.includes(',')) {
        hours = result.data.split(',').map((h:any) => h.trim());
      } else {
        hours = [result.data];
      }
    } else if (Array.isArray(result.data)) {
      // Obsługa danych jako tablica
      hours = result.data.map((item : any ) => {
        if (typeof item === 'string' && item.includes('((') && item.includes('))')) {
          // Próba parsowania formatu ((H,m),(H,m)) w tablicy
          const regex = /\(\((\d+),\s*(\d+)\),\s*\((\d+),\s*(\d+)\)\)/;
          const match = item.match(regex);

          if (match) {
            const startHour = parseInt(match[1]);
            const startMinute = parseInt(match[2]);
            const endHour = parseInt(match[3]);
            const endMinute = parseInt(match[4]);

            const formatTime = (h: number, m: number) =>
              `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

            return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
          }
          return item;
        } else if (Array.isArray(item) && item.length === 2 &&
                  Array.isArray(item[0]) && Array.isArray(item[1])) {
          // Format [[h1,m1],[h2,m2]]
          const startHour = item[0][0];
          const startMinute = item[0][1];
          const endHour = item[1][0];
          const endMinute = item[1][1];

          const formatTime = (h: number, m: number) =>
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

          return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
        } else {
          return typeof item === 'string' ? item : JSON.stringify(item);
        }
      });
    } else if (typeof result.data === 'object' && result.data !== null) {
      const data = result.data;

      // Sprawdzenie, czy mamy dokładnie jedną parę ((...),(...))
      if (data.toString && data.toString().match(/^\(\(\d+,\s*\d+\),\s*\(\d+,\s*\d+\)\)$/)) {
        const stringValue = data.toString();
        const regex = /\(\((\d+),\s*(\d+)\),\s*\((\d+),\s*(\d+)\)\)/;
        const match = stringValue.match(regex);

        if (match) {
          const startHour = parseInt(match[1]);
          const startMinute = parseInt(match[2]);
          const endHour = parseInt(match[3]);
          const endMinute = parseInt(match[4]);

          const formatTime = (h: number, m: number) =>
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

          hours = [`${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`];
        }
      } else if (data.optimalHours) {
        hours = Array.isArray(data.optimalHours) ? data.optimalHours : [data.optimalHours];
      } else {
        // Domyślne wartości
        hours = ['01:00 - 05:00', '14:00 - 16:00', '22:00 - 24:00'];
      }
    }
  } catch (error) {
    console.error("Błąd podczas parsowania danych:", error);
    hours = ['Błąd parsowania formatu danych'];
  }

  if (hours.length === 0) {
    hours = ['Brak danych w formacie godzinowym'];
  }

  return hours;
};
      const hours = processData();
      setOptimalHours(hours);
    } catch (error) {
      console.error("Błąd podczas przetwarzania danych:", error);
      setOptimalHours(['Błąd przetwarzania danych']);
    } finally {
      setLoading(false);
    }
  }, [result]); // Reaguj na zmiany w result, nie w input

  return (
    <div className="battery-container border-4 border-gray-300 rounded-lg pt-2 pb-6 px-6 bg-gray-700 relative my-4 shadow-lg shadow-gray-600">
      {/* Górna część baterii (kapsel) */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-gray-500 border-2 border-gray-300 rounded-t-md"></div>

      <h2 className="font-bold text-xl mb-6 text-center text-green-400 flex items-center justify-center">
        <FaClockRotateLeft className="mr-2" />
        Optymalne godziny ładowania
      </h2>

      {/* Wskaźniki naładowania baterii */}
      <div className="flex justify-between mb-4 px-2">
        <div className="w-full h-3 bg-green-400 rounded-full mb-1"></div>
      </div>
      <div className="flex justify-between mb-4 px-2">
        <div className="w-2/3 h-3 bg-green-400 rounded-full mb-1"></div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : optimalHours.length === 0 ? (
          <div className="text-center text-gray-400 p-8">
            <p>Brak danych o optymalnych godzinach ładowania</p>
            <p className="mt-2 text-sm">Wprowadź dane w formularzu aby uzyskać wyniki</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {optimalHours.map((hour, index) => (
              <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 bg-green-500 p-2 rounded-full">
                    <FaBolt className="text-white" />
                  </div>
                  <span className="text-lg text-green-300">{hour}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm px-2 py-1 bg-gray-600 rounded-md text-green-300 flex items-center">
                    <FaChartLine className="mr-1 text-green-400" />
                    <span>Niskie ceny</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-800 mt-4 p-3 rounded-lg border border-gray-600">
        <div className="text-sm text-gray-300 mb-2">
          <span className="text-green-400 font-semibold">Informacja:</span> Optymalne godziny ładowania banku energii
        </div>
      </div>
    </div>
  );
}