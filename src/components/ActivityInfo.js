import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

function ActivityInfo() {
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
        setUrl(data.url);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  useEffect(() => {
    apiGetInfo("xid/" + id);
  }, [id]);

  useEffect(() => {
    cleanUrl();
  }, [url]);

  const cleanUrl = () => {
    if (url) {
      const urlArray = url.split(";");
      setUrl(urlArray[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

  const backToActivities = () => {
    const params = new URLSearchParams({ query: location.state });
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
            <p className="text-justify">{info}</p>
            <br />
            {!url && null}
            {url && (
              <p>
                <span className="font-bold mr-4">Location website:</span>
                <a href={url} className="text-sky-700">
                  {url}
                </a>
              </p>
            )}

            <button className="btn confirm-btn mt-8" onClick={backToActivities}>
              Back to activities
            </button>
          </div>
          <div>
            {image === null && "We have no image for this location :("}
            <img src={image} alt={name} />
          </div>
        </section>
      </section>
    </>
  );
}

export default ActivityInfo;
