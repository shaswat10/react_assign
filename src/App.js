import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableList from "../src/screens/TableList";
import "bootstrap/dist/css/bootstrap.min.css";
import Formpage from "../src/screens/Formpage";
import { PersistGate } from "redux-persist/integration/react";
import RouteComonent from "./components/RouteComonent";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
// import persistor from './store'

function App() {
  return (
    // <Provider store={store}>
      <RouteComonent />
    // </Provider>
  );
}

export default App;
