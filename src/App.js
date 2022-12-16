import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Plans from "./components/Plans";

function App() {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, []);

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  const addToPlans = (plan) => {
    setPlans([...plans, plan]);
  };

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Home latitude={userLatitude} longitude={userLongitude} />}
        />
        <Route
          path="/activities"
          element={
            <Activities
              latitude={userLatitude}
              longitude={userLongitude}
              addToPlans={addToPlans}
            />
          }
        />
        <Route path="/plans" element={<Plans plans={plans} />} />
      </Routes>
    </main>
  );
}

export default App;
