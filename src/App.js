import React from "react";
import "./styles/main/main.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;
