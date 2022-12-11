import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapContainer, Marker, Popup } from "react-leaflet";
import Activity from "./Activity";
import CityMap from "./CityMap";
// import "./Activities.css";

const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;
const pageLength = 5; // number of objects per page
let offset = 0; // offset from first object in the list
let count; // total objects count

const Activities = ({ latitude, longitude }) => {
  const [query, setQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [cityCoords, setCityCoords] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setQuery(query);
      apiGet("geoname", "name=" + query.toLowerCase());
    }
  }, [searchParams]);

  useEffect(() => {
    if (latitude && longitude && !query) {
      setCityCoords([latitude, longitude]);
    }
  }, [latitude, longitude, query]);

  useEffect(() => {
    if (cityCoords.length > 0) {
      apiGet(
        "radius",
        `radius=1000&limit=${pageLength}&offset=${offset}&lon=${cityCoords[1]}&lat=${cityCoords[0]}&rate=2&format=${count}`
      );
    }
  }, [cityCoords]);

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
        if (Array.isArray(data) === false) {
          setCityCoords([data.lat, data.lon]);
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
      <section className="w-[980px]">
        <div className="flex justify-between gap-8 mb-12">
          <h1 className="text-3xl font-['La_Belle_Aurore']">
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
          <Link to={"/"}>
            <button className="btn confirm-btn">Home</button>
          </Link>
        </div>
        <section className="grid grid-cols-2 gap-24 h-[420px]">
          <ul className="list-none m-0 p-0">
            {activities &&
              activities.map((activity, index) => {
                return <Activity key={index} {...activity} />;
              })}
          </ul>

          {cityCoords.length > 0 && (
            <MapContainer center={cityCoords} zoom={12} scrollWheelZoom={false}>
              <CityMap center={cityCoords} zoom={12} />
            </MapContainer>
          )}
        </section>
      </section>
    </>
  );
};

export default Activities;
