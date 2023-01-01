import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Plans from "./components/Plans";
import Overlay from "./components/Overlay";
import PlanOverlay from "./components/PlanOverlay";

function App() {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigate = useNavigate();

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

  const storePlans = useCallback(() => {
    if (plans.length > 0) {
      localStorage.setItem("plans", JSON.stringify(plans));
    }
  }, [plans]);

  useEffect(() => {
    storePlans();
  }, [plans, storePlans]);

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  const addToPlans = (plan, query) => {
    const found = plans.find((existingPlan) => existingPlan.xid === plan.xid);
    if (found) return;
    setPlans([...plans, plan]);
    const params = new URLSearchParams({ query });
    navigate({ pathname: "confirm", search: params.toString() });
  };

  const removeFromPlans = (id) => {
    const updatedPlans = plans.filter((plan) => plan.xid !== id);
    setPlans(updatedPlans);

    if (updatedPlans.length < 1) {
      setCurrentPlan(null);
      localStorage.setItem("plans", JSON.stringify([]));
    }

    navigate("/plans");
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
              currentPlan={currentPlan}
              setCurrentPlan={setCurrentPlan}
            />
          }
        />
        <Route path="/confirm" element={<Overlay />} />
        <Route
          path="/confirm-delete"
          element={<PlanOverlay removeFromPlans={removeFromPlans} />}
        />
      </Routes>
    </main>
  );
}

export default App;
