import { useState } from "react";
import { FaChartBar, FaMapMarkedAlt } from "react-icons/fa";

export default function ImageComponent() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div className="battery-container border-4 border-gray-300 rounded-lg pt-2 pb-6 px-6 bg-gray-700 relative my-4 max-w-4xl mx-auto shadow-xl shadow-gray-600">
      {/* Górna część ramki (podobna do kapsla baterii) */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-gray-500 border-2 border-gray-300 rounded-t-md"></div>

      <h2 className="font-bold text-xl mb-6 text-center text-green-400 flex items-center justify-center">
        <FaMapMarkedAlt className="mr-2" />
        Mapa rozłożenia zasobów energetycznych
      </h2>

      <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600">
        {!imageLoaded && !error && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-red-400">
            <p className="text-xl mb-2">Nie udało się załadować obrazu</p>
            <p className="text-sm text-gray-400">Sprawdź, czy plik istnieje w katalogu projektu</p>
          </div>
        )}

        <img
          src="/analiza_energii.png"
          alt="Mapa rozłożenia energii w Polsce"
          className={`w-full h-auto rounded-lg border border-gray-500 ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {/* Pasek informacyjny podobny do tego w FormAdditional */}
      <div className="flex justify-between mt-6 text-sm text-gray-300 px-2">
        <div className="flex justify-between mb-2 px-2">
          <div className="w-full h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>

      {/* Legenda */}
      <div className="bg-gray-800 mt-4 p-3 rounded-lg border border-gray-600 flex justify-between items-center">
        <div className="flex items-center">
          <FaChartBar className="text-green-400 mr-2" />
          <span className="text-sm">Dane analityczne</span>
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2 rounded-sm"></div>
            <span className="text-sm">Okres ładowania</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 mr-2 rounded-sm"></div>
            <span className="text-sm">Produkcaj energi z PV</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2 rounded-sm"></div>
            <span className="text-sm">Cena energii</span>
          </div>
        </div>
      </div>
    </div>
  );
}