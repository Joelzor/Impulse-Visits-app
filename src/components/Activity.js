import { useNavigate, Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Activity = ({
  activity,
  addToPlans,
  plansActivity = false,
  setCurrentPlan,
  currentPlan,
  query,
}) => {
  const navigate = useNavigate();
  const { kinds, name, xid } = activity;
  // Splitting string into an array then replacing underscores with space
  const tags = kinds.split(",");
  const tagsFixed = tags.map((tag) => {
    return tag.replaceAll("_", " ");
  });

  const highlightPlan =
    currentPlan && currentPlan.xid === activity.xid ? "bg-[#43c59e]" : null;

  return (
    <div className="flex justify-between">
      <li
        className={`mb-4 p-2 cursor-pointer rounded-lg w-[415px] ${highlightPlan}
          `}
        onClick={() => setCurrentPlan(activity)}
      >
        <div>
          <h3>{`${name.substring(0, 50)}...`}</h3>
          <p className="mt-2.5 italic">
            <span className="tag">{tagsFixed[0]}</span>{" "}
            <span className="tag">{tagsFixed[1]}</span>{" "}
            <span className="tag">{tagsFixed[2]}</span>
          </p>
        </div>
      </li>
      {!plansActivity && (
        <button
          className="self-center rounded-full hover:bg-[#92ddc7]"
          onClick={() => {
            addToPlans(activity, query);
          }}
          title="Add to plans!"
        >
          <AiOutlinePlusCircle className="h-6 w-auto text-[#43c59e] hover:text-black" />
        </button>
      )}
      {plansActivity && (
        <Link to="/confirm-delete" state={xid}>
          <button
            className="self-center rounded-full hover:bg-[#FCB0B0]"
            title="Remove from plans!"
          >
            <AiOutlineMinusCircle className="h-6 w-auto text-[#F96262] hover:text-black" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Activity;
