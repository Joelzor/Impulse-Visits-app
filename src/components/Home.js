import { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;
const apiKeyGeocode = process.env.REACT_APP_API_KEY_GEOCODE;

const Home = () => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, []);

  useEffect(() => {
    if (userLatitude && userLongitude) {
      console.log(userLatitude);
      console.log(userLongitude);
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${userLatitude}&lon=${userLongitude}&apiKey=${apiKeyGeocode}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLocation(data.features[0].properties.city);
        })
        .catch((err) => {
          console.log(err);
        });
      // const pageLength = 5; // number of objects per page
      // let offset = 0; // offset from first object in the list
      // let count; // total objects count
      // apiGet(
      //   "radius",
      //   `radius=1000&limit=${pageLength}&offset=${offset}&lon=${userLongitude}&lat=${userLatitude}&rate=2&format=${count}`
      // );
    }
  }, [userLatitude, userLongitude]);

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  // function given to us by the Open Trip Map API (slightly adjusted)
  // function apiGet(method, query) {
  //   let otmAPI =
  //     "https://api.opentripmap.com/0.1/en/places/" +
  //     method +
  //     "?apikey=" +
  //     apiKey;
  //   if (query !== undefined) {
  //     otmAPI += "&" + query;
  //   }
  //   fetch(otmAPI)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch(function (err) {
  //       console.log("Fetch Error :-S", err);
  //     });
  // }

  return (
    <>
      <h1>Impulse Visits</h1>
      <p>Your location: {location ? location : "Unable to locate"}</p>
    </>
  );
};

export default Home;
