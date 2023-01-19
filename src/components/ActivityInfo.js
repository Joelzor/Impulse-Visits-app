import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

function ActivityInfo() {
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;

  function apiGetInfo(method, query) {
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
        setInfo(data.wikipedia_extracts.text);
        setImage(data.preview.source);
        setName(data.name);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  useEffect(() => {
    apiGetInfo("xid/" + id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

  return (
    <>
      <section className="w-[980px]">
        <Header
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
          title="Activity"
        />
        <section className="section-container">
          <div>
            {info === null &&
              "We have no information about this location :( Please try another!"}
            {info}
          </div>
          <div>
            {image === null && "We have no image for this location"}
            <img src={image} alt={name} />
          </div>
        </section>
      </section>
    </>
  );
}

export default ActivityInfo;
