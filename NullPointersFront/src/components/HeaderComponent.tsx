import {FaBatteryFull, FaBolt, FaSolarPanel} from "react-icons/fa";

export default function HeaderComponent(){
  return (

    <header className="bg-gray-900 text-white p-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaBatteryFull className="text-green-400 text-5xl"/>
          <h1 className="text-4xl font-bold">Null Pointers</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="flex items-center">
              <FaBolt className="text-yellow-400 mr-2 size-6"/>
              <span className={"text-xl"}>Kalkulator Energii</span>
            </li>
            <li className="flex items-center">
              <FaSolarPanel className="text-blue-400 mr-2 size-6"/>
              <span className={"text-xl"}>Magazyny Energii</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}