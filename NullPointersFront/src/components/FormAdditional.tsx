import {useState} from "react";
import * as React from "react";
import axios from "axios";

interface FormInput {
  carAmount?: string;
  usageAmount?: string;
  sourcePower: string

}

export default function FormAdditional() {
  const [input, setInput] = useState<FormInput>({carAmount: "", usageAmount: "", sourcePower: ""})
  const [additional, setAdditional] = useState<boolean>(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prevState => {
      const {name, value} = e.target
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5555/sendData", input)
      if (response.status === 200) {
        alert('Dane zostały zapisane pomyślnie')
      }
    } catch (error) {
      alert('Błąd podczas zapisywania danych')
    }
  }
  return (
    <>
      <h2>Opcje niestandardowe</h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="md-5">
          <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Moc
            baterii</label>
          <input type="text" id="base-input" name="sourcePower" value={input['sourcePower']} onChange={handleInput}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>

        <div className={"my-5"}>
          <input type="checkbox" id="additional" name="additional" checked={additional}
                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 onChange={() => setAdditional(prevState => !prevState)}
          />
          <label htmlFor="additional" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">Dodatkowe
            opcje</label>
        </div>

        <div className="mb-5">
          <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ilosc
            samochodow</label>
          <input type="text" id="base-input" name="carAmount" value={input['carAmount']} disabled={!additional}
                 className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 onChange={handleInput}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zuzycie
            energii</label>
          <input type="text" id="base-input" name="usageAmount" value={input['usageAmount']} disabled={!additional}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">Oblicz
        </button>
      </form>

    </>
  )
}