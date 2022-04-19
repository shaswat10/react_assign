import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableList from "../screens/TableList";
import "bootstrap/dist/css/bootstrap.min.css";
import Formpage from "../screens/Formpage";
import { ADD, EDIT } from "../const";


function RouteComonent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableList />} exact />
        <Route path="/add" element={<Formpage formType={ADD}/>} exact />
        <Route path="/edit" element={<Formpage formType={EDIT}/>} exact />
        <Route path="/edit/:pk" element={<Formpage formType={EDIT}/>} exact />

      </Routes>
    </BrowserRouter>
  );
}

export default RouteComonent;
