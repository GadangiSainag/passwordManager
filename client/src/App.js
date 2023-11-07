import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "../src/pages/components/NavBar";
import Home from "../src/pages/Home";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/passwords" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
