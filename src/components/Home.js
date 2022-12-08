import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

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

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

  return (
    <>
      <section className="home">
        <div className="banner">
          <h1 className="home-title">Impulse Visits</h1>
          <img
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="city"
            className="banner-img"
          />
        </div>
        <div className="location-container">
          <p>
            Your location:{" "}
            <span className="location-text">
              {location ? location : "Unable to locate"}
            </span>
          </p>
          <Link to={"/activities"} state={{ location }}>
            <button className="btn confirm-btn">Confirm</button>
          </Link>
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
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
