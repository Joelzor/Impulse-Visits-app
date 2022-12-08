import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
  const [cityCoords, setCityCoords] = useState([]);

  console.log(cityCoords);

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
          // setCityLatitude(data.lat);
          // setCityLongitude(data.lon);
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
        {cityCoords.length > 0 && (
          <MapContainer center={cityCoords} zoom={12} scrollWheelZoom={false}>
            <MyMap center={cityCoords} zoom={12} />
          </MapContainer>
        )}
      </section>
    </>
  );
};

const MyMap = (props) => {
  const map = useMap();
  map.getCenter();
  map.setView(props.center, props.zoom);

  return (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  );
};

export default Activities;
