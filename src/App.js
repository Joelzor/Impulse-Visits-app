import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";

const apiKey = "AIzaSyAFVPra5dqDvAbLHOh0wEw0u5bLCTocZro";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </main>
  );
}

export default App;
