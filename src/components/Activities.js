import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer } from "react-leaflet";
import Activity from "./Activity";
import Header from "./Header";
import CityMap from "./CityMap";
import Loading from "./Loading";

const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;
const pageLength = 25; // number of objects per page
let offset = 0; // offset from first object in the list
let count; // total objects count

const Activities = ({ latitude, longitude, addToPlans }) => {
  const [query, setQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [cityCoords, setCityCoords] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams()[0];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

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
        setLoading(false);
        if (Array.isArray(data) === false) {
          setCityCoords([data.lat, data.lon]);
        } else {
          setActivities(data);
        }
      })
      .catch(function (err) {
        setLoading(false);
        console.log("Fetch Error :-S", err);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    apiGet("geoname", "name=" + query.toLowerCase());
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="w-[980px]">
        <Header
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
          title="Where to visit next?"
        />
        <section className="section-container ">
          <ul className="list-none m-0 p-0 overflow-y-scroll">
            {activities &&
              activities.map((activity, index) => {
                return (
                  <Activity
                    key={index}
                    activity={activity}
                    addToPlans={addToPlans}
                    query={query}
                  />
                );
              })}
          </ul>

          {cityCoords.length > 0 && (
            <MapContainer center={cityCoords} zoom={14} scrollWheelZoom={true}>
              <CityMap center={cityCoords} zoom={14} activities={activities} />
            </MapContainer>
          )}
        </section>
      </section>
    </>
  );
};

export default Activities;
