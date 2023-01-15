import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActivityInfo() {
  // What I need on this page...
  // activity - could I just use params and make a new request?
  // apiGetInfo - needed to make the request with the xid
  const [info, setInfo] = useState(null);
  const { id } = useParams();
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
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  useEffect(() => {
    apiGetInfo("xid/" + id);
  }, [id]);

  return <div>{info}</div>;
}

export default ActivityInfo;
