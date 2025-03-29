import FormAdditional from "./components/FormAdditional.tsx";
// import FormMain from "./components/FormMain.tsx";

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-500 flex flex-col mx-6 text-white">
        <header className="bg-gray-900 text-white p-4">
          <h1 className="text-2xl">Null Pointers</h1>
        </header>
        <div id="container" className="flex flex-grow">

          <aside className={"w-[40%] border h-200 shadow-lg shadow-gray-600 "}>
            <FormAdditional/>
          </aside>
          <main className="flex-grow p-4">
            {/*<FormMain/>*/}
          </main>

        </div>
        <footer className="bg-gray-900 text-white p-4 text-center">
          <p>&copy; 2025 NullPointers</p>
        </footer>
      </div>
    </>
  )
}

export default App
