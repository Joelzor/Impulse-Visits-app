import { useNavigate } from "react-router-dom";

const Overlay = () => {
  const navigate = useNavigate();

  const backToActivities = () => {
    navigate({ pathname: "/activities" });
  };

  const goToPlans = () => {
    navigate({ pathname: "/plans" });
  };

  return (
    <div className="overlay show-overlay">
      <div className="modal">
        <h3>Plan successfully added!</h3>
        <div className="flex gap-10">
          <button className="btn confirm-btn" onClick={backToActivities}>
            Back to activities
          </button>
          <button className="btn plans-btn" onClick={goToPlans}>
            See my plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
