import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import Activity from "./Activity";
import "./Activities.css";

const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;
const pageLength = 5; // number of objects per page
let offset = 0; // offset from first object in the list
let count; // total objects count

const Activities = ({ latitude, longitude }) => {
  const [query, setQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [cityLatitude, setCityLatitude] = useState(null);
  const [cityLongitude, setCityLongitude] = useState(null);

  // const location = useLocation();

  useEffect(() => {
    if (latitude && longitude && !query) {
      apiGet(
        "radius",
        `radius=1000&limit=${pageLength}&offset=${offset}&lon=${longitude}&lat=${latitude}&rate=2&format=${count}`
      );
    }
  }, [latitude, longitude, query]);

  useEffect(() => {
    if (cityLongitude && cityLatitude) {
      apiGet(
        "radius",
        `radius=1000&limit=${pageLength}&offset=${offset}&lon=${cityLongitude}&lat=${cityLatitude}&rate=2&format=${count}`
      );
    }

    console.log(activities);
  }, [cityLongitude, cityLatitude]);

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
      .then((data) => {
        // surely a better way to do this
        if (Array.isArray(data) === false) {
          setCityLatitude(data.lat);
          setCityLongitude(data.lon);
        } else {
          setActivities(data);
        }
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    apiGet("geoname", "name=" + query.toLowerCase());
  };

  return (
    <>
      <div className="activities-header">
        <h1>The possibilities are endless...</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="searchbar"
            placeholder="Search for another city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <section className="activities-container">
        <ul className="activities-list">
          {activities &&
            activities.map((activity, index) => {
              return <Activity key={index} {...activity} />;
            })}
        </ul>
      </section>
    </>
  );
};

export default Activities;
