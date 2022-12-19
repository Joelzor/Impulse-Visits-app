import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Plans from "./components/Plans";

function App() {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [plans, setPlans] = useState([]);
  const initialRender = useRef(true);

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

  const storePlans = () => {
    localStorage.setItem("plans", JSON.stringify(plans));
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    storePlans();
  }, [plans]);

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  const addToPlans = (plan) => {
    const found = plans.find((existingPlan) => existingPlan.xid === plan.xid);
    if (found) return;
    setPlans([...plans, plan]);
  };

  const removeFromPlans = (id) => {
    const updatedPlans = plans.filter((plan) => plan.xid !== id);
    setPlans(updatedPlans);
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
        <Route
          path="/plans"
          element={
            <Plans
              plans={plans}
              setPlans={setPlans}
              removeFromPlans={removeFromPlans}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
