import { Link } from "react-router-dom";

const Header = ({ handleSubmit, query, setQuery }) => {
  return (
    <div className="flex justify-between gap-8 mb-12 items-center">
      <h1 className="text-3xl pt-4 font-['La_Belle_Aurore']">
        Where to visit next?
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="searchbar"
          placeholder="Search for another city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn search-btn">
          Search
        </button>
      </form>
      <Link to={"/plans"}>
        <button className="btn plans-btn">Plans</button>
      </Link>
      <Link to={"/"}>
        <button className="btn confirm-btn">Home</button>
      </Link>
    </div>
  );
};

export default Header;
