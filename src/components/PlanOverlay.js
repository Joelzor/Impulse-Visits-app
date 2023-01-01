import { useNavigate, useLocation } from "react-router-dom";

const PlanOverlay = ({ removeFromPlans }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="overlay show-overlay">
      <div className="modal">
        <h3>Are you sure you want to delete this plan?</h3>
        <div className="flex gap-10">
          <button
            className="btn confirm-btn"
            onClick={() => removeFromPlans(location.state)}
          >
            Confirm
          </button>
          <button className="btn plans-btn" onClick={() => navigate("/plans")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanOverlay;
