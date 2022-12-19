import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Activity from "./Activity";

const Plans = ({ plans, setPlans, removeFromPlans }) => {
  const [query, setQuery] = useState("");
  const [currentPlan, setCurrentPlan] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let storedPlans = localStorage.getItem("plans");
    if (storedPlans) {
      storedPlans = JSON.parse(localStorage.getItem("plans"));
      setPlans(storedPlans);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

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
        <div>
          <p>
            {currentPlan
              ? `${currentPlan.name}`
              : "Select a plan to see more information"}
          </p>
        </div>
      </section>
    </section>
  );
};

export default Plans;
