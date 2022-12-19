import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Activity = ({ activity, addToPlans, plansActivity = false }) => {
  const { kinds, name } = activity;
  // Splitting string into an array then replacing underscores with space
  const tags = kinds.split(",");
  const tagsFixed = tags.map((tag) => {
    return tag.replaceAll("_", " ");
  });

  return (
    <div className="flex justify-between">
      <li className="mb-4 p-2 cursor-pointer rounded-lg hover:bg-[#b8b8b8] w-[415px]">
        <div>
          <h3>{`${name.substring(0, 50)}...`}</h3>
          <p className="mt-2.5 italic">
            <span className="tag">{tagsFixed[0]}</span>{" "}
            <span className="tag">{tagsFixed[1]}</span>{" "}
            {/* <span className="tag">{tagsFixed[2]}</span> */}
          </p>
        </div>
      </li>
      {!plansActivity && (
        <button
          className="self-center rounded-full hover:bg-[#92ddc7]"
          onClick={() => {
            addToPlans(activity);
          }}
          title="Add to plans!"
        >
          <AiOutlinePlusCircle className="h-6 w-auto text-[#43c59e] hover:text-black" />
        </button>
      )}
      {plansActivity && (
        <button
          className="self-center rounded-full hover:bg-[#FCB0B0]"
          title="Remove from plans!"
        >
          <AiOutlineMinusCircle className="h-6 w-auto text-[#F96262] hover:text-black" />
        </button>
      )}
    </div>
  );
};

export default Activity;
