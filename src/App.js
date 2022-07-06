import React from "react";
import "./styles/main/main.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin"
import Account from "./components/Account";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  )
}

export default App;
