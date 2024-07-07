import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  document.title = "AGV UI";
  return (
    <Provider store={store}>
      <div className="app-container">
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </PersistGate>
      </div>
    </Provider>
  );
}

export default App;
