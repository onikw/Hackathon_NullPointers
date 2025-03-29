import InputComponent from "./InputComponent";

export default function ElectricCarsInput() {

    return (
        <div className="flex flex-row gap-6 p-4 border border-gray-600 rounded-lg bg-gray-800">
            <div className="flex-1">
                <InputComponent
                    disabled={false}
                    title="Liczba aut elektrycznych"
                    name="carAmount"
                />
                <InputComponent
                    disabled={false}
                    title="Średnia pojemność ogniw (kWh)"
                    name="usageAmount"
                />
            </div>
            <div className="flex items-center justify-center">
                <svg
                    width="120"
                    height="70"
                    viewBox="0 0 120 70"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Cień pod autem */}
                    <ellipse cx="60" cy="62" rx="40" ry="3" fill="#000000" opacity="0.2" />

                    {/* Korpus auta */}
                    <rect x="15" y="35" width="90" height="20" rx="10" fill="#2196F3" />

                    {/* Kabina */}
                    <rect x="30" y="20" width="60" height="15" rx="7" fill="#64B5F6" />

                    {/* Koła */}
                    <circle cx="35" cy="55" r="8" fill="#212121" />
                    <circle cx="35" cy="55" r="3" fill="#424242" />
                    <circle cx="85" cy="55" r="8" fill="#212121" />
                    <circle cx="85" cy="55" r="3" fill="#424242" />

                    {/* Symbol ładowania/baterii */}
                    <rect x="52" y="10" width="16" height="8" rx="1" fill="#4CAF50" />
                    <rect x="54" y="8" width="12" height="2" rx="1" fill="#4CAF50" />
                    <rect x="56" y="12" width="8" height="4" fill="#FFFFFF" opacity="0.8" />

                    {/* Reflektory */}
                    <rect x="17" y="38" width="4" height="4" rx="2" fill="#FFECB3" />
                    <rect x="99" y="38" width="4" height="4" rx="2" fill="#FF5252" />

                    {/* Okna/detale */}
                    <line x1="35" y1="20" x2="85" y2="20" stroke="#B3E5FC" strokeWidth="1.5" />
                    <line x1="30" y1="35" x2="90" y2="35" stroke="#B3E5FC" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}