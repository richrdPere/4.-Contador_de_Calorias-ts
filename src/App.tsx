import { useReducer } from "react";
// Components
import Form from "./components/Form";
// UseReducer
import { activityReducer, initialState } from "./reducers/activityReducer";



function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
          />
        </div>
      </section>
    </>
  );
}

export default App;
