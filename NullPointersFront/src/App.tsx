import FormAdditional from "./components/FormAdditional.tsx";
import ResultComponent from "./components/ResultComponent.tsx";
import HeaderComponent from "./components/HeaderComponent.tsx";
import { FormProvider } from "./contexts/FormContext.tsx";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-500 flex flex-col mx-6 text-white">
        <HeaderComponent />
        <div id="container" className="flex flex-grow flex-col">
          <div className={"flex-grow"}></div>
          <div className={"flex justify-around"}>
            <FormProvider>
              <aside className="w-1/4 border h-fit [50%] shadow-lg shadow-gray-600 m-5 border-gray-300 rounded-lg p-4 bg-gray-700">
                <FormAdditional />
              </aside>
              <section>
                <ResultComponent />
              </section>
            </FormProvider>
          </div>
          <main className="flex-grow p-4">
          </main>
        </div>
        <footer className="bg-gray-900 text-white p-4 text-center">
          <p>&copy; 2025 NullPointers</p>
        </footer>
      </div>
    </>
  );
}

export default App;