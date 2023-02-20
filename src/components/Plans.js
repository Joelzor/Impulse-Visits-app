import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Activity from "./Activity";
import Loading from "./Loading";
import CityMap from "./CityMap";
import { MapContainer } from "react-leaflet";

const Plans = ({
  plans,
  setPlans,
  removeFromPlans,
  currentPlan,
  setCurrentPlan,
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [planCoords, setplanCoords] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let storedPlans = localStorage.getItem("plans");
    setLoading(false);
    if (storedPlans) {
      storedPlans = JSON.parse(localStorage.getItem("plans"));
      setPlans(storedPlans);
    }
  }, [setPlans]);

  useEffect(() => {
    if (currentPlan) {
      const { lat, lon } = currentPlan.point;
      setplanCoords([lat, lon]);
    }
  }, [currentPlan]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-[980px]">
      <Header
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        title="Your plans"
      />
      <section className="section-container">
        <ul className="list-none m-0 p-0">
          {plans.length === 0 && (
            <p>
              You currently have no plans! Please search for a new location
              above
            </p>
          )}
          {plans &&
            plans.map((activity, index) => {
              return (
                <Activity
                  key={index}
                  activity={activity}
                  plansActivity={true}
                  removeFromPlans={removeFromPlans}
                  currentPlan={currentPlan}
                  setCurrentPlan={setCurrentPlan}
                />
              );
            })}
        </ul>
        {currentPlan && planCoords && (
          <MapContainer center={planCoords} zoom={14} scrollWheelZoom={true}>
            <CityMap center={planCoords} zoom={14} plan={currentPlan} />
          </MapContainer>
        )}
        <div>
          {plans.length > 0 &&
            !currentPlan &&
            "Select a plan to see more information"}
        </div>
      </section>
    </section>
  );
};

export default Plans;
