import FormAdditional from "./components/FormAdditional.tsx";
import ResultComponent from "./components/ResultComponent.tsx";
import HeaderComponent from "./components/HeaderComponent.tsx";
import {FormProvider} from "./contexts/FormContext.tsx";
import ImageComponent from "./components/ImageComponent.tsx";
import Hourses from "./components/Hourses.tsx";

function App() {
  return (
    <FormProvider>
      <>
        <div className="min-h-screen bg-gray-500 flex flex-col text-white">
          <HeaderComponent/>
          <div id="container" className="flex flex-grow flex-col">
            <div className={"flex-grow"}></div>
            <div className={"flex justify-around"}>

              <aside
                className="w-1/4 border h-fit [50%] shadow-xl shadow-gray-600 m-5 border-gray-300 rounded-lg p-4 bg-gray-700">
                <FormAdditional/>
              </aside>
              <div>
                <section className={"p-4 bg-gray-800 border border-gray-600 rounded-lg h-fit m-5"}>
                  <ResultComponent/>
                </section>
                <section className={""}>
                  <Hourses />
                </section>
              </div>
            </div>
            <main className="flex-grow p-4">
              <ImageComponent/>
            </main>
          </div>
          <footer className="bg-gray-900 text-white p-4 text-center">
            <p>&copy; 2025 NullPointers</p>
          </footer>
        </div>
      </>
    </FormProvider>
  );
}

export default App;