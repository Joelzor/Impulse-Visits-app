import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup } from "react-leaflet";
import Activity from "./Activity";
import Header from "./Header";
import CityMap from "./CityMap";

const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;
const pageLength = 5; // number of objects per page
let offset = 0; // offset from first object in the list
let count; // total objects count

const Activities = ({ latitude, longitude, addToPlans }) => {
  const [query, setQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [cityCoords, setCityCoords] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const overlay = useRef(null);
  const map = useRef(null);

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
        <Header
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
          title="Where to visit next?"
        />
        <section className="section-container">
          <ul className="list-none m-0 p-0">
            {activities &&
              activities.map((activity, index) => {
                return (
                  <Activity
                    key={index}
                    activity={activity}
                    addToPlans={addToPlans}
                    overlay={overlay}
                    map={map}
                  />
                );
              })}
          </ul>

          {cityCoords.length > 0 && (
            <MapContainer
              center={cityCoords}
              zoom={12}
              scrollWheelZoom={false}
              ref={map}
            >
              <CityMap center={cityCoords} zoom={12} />
            </MapContainer>
          )}
        </section>
      </section>
      <div className="overlay" ref={overlay}>
        <div className="modal"></div>
      </div>
    </>
  );
};

export default Activities;
