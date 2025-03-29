import FormAdditional from "./components/FormAdditional.tsx";
import ResultComponent from "./components/ResultComponent.tsx";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-500 flex flex-col mx-6 text-white">
        <header className="bg-gray-900 text-white p-4">
          <h1 className="text-2xl">Null Pointers</h1>
        </header>
        <div id="container" className="flex flex-grow flex-col">
          <div className={"flex-grow"}></div>
          <div className={"flex justify-around"}>

          <aside className="w-1/4 border h-fit [50%] shadow-lg shadow-gray-600 m-5 border-gray-300 rounded-lg p-4 bg-gray-700">
            <FormAdditional />
          </aside>
          <section>
            <ResultComponent />

          </section>
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