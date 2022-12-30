import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const apiKeyGeocode = process.env.REACT_APP_API_KEY_GEOCODE;

const Home = ({ latitude, longitude }) => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKeyGeocode}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.features[0].properties.city);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [latitude, longitude]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

  return (
    <>
      <section className="rounded-xl overflow-hidden bg-white shadow-lg">
        <div className="relative">
          <h1 className="absolute top-5 left-20 font-['La_Belle_Aurore'] text-2xl">
            Impulse Visits
          </h1>
          <img
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="city"
            className="h-96 w-auto"
          />
        </div>
        {/* location container */}
        <div className="mt-7 flex justify-center items-center gap-12 text-2xl">
          <p>
            Your location:{" "}
            <span className="font-semibold ml-2.5">
              {location ? location : "Unable to locate"}
            </span>
          </p>
          <Link to={"/activities"} state={{ location }}>
            <button className="btn confirm-btn">Confirm</button>
          </Link>
        </div>
        <form className="mt-7 ml-36 mb-5" onSubmit={handleSubmit}>
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
      </section>
    </>
  );
};

export default Home;
