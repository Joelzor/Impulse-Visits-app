import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Activities.css";

const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;

const Activities = ({ latitude, longitude }) => {
  const [query, setQuery] = useState("");
  const [activities, setActivities] = useState([]);

  // const location = useLocation();

  useEffect(() => {
    // AND query isn't null? So we don't search by location but rather with the user query
    if (latitude && longitude && !query) {
      const pageLength = 5; // number of objects per page
      let offset = 0; // offset from first object in the list
      let count; // total objects count
      apiGet(
        "radius",
        `radius=1000&limit=${pageLength}&offset=${offset}&lon=${longitude}&lat=${latitude}&rate=2&format=${count}`
      );
    }

    console.log(activities);
  }, [latitude, longitude, query]);

  // function given to us by the Open Trip Map API (slightly adjusted)
  function apiGet(method, query) {
    let otmAPI =
      "https://api.opentripmap.com/0.1/en/places/" +
      method +
      "?apikey=" +
      apiKey;
    if (query !== undefined) {
      otmAPI += "&" + query;
    }
    fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  return (
    <>
      <div className="activities-header">
        <h1>The possibilities are endless...</h1>
        <form>
          <input
            type="search"
            className="searchbar"
            placeholder="Search for another city..."
            // value={query}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul>
        {activities &&
          activities.map((activity, index) => {
            const { name } = activity;
            return (
              <li key={index}>
                <p>{name}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Activities;
