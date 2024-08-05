import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  document.title = "AGV UI";
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
