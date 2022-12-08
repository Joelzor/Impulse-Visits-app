import { useState, useEffect } from "react";
import "./Home.css";

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
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${userLatitude}&lon=${userLongitude}&apiKey=${apiKeyGeocode}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.features[0].properties.city);
        })
        .catch((err) => {
          console.log(err);
        });
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

  return (
    <>
      <div className="banner">
        <h1 className="home-title">Impulse Visits</h1>
        <img
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="city"
          className="banner-img"
        />
      </div>
      <div className="location-container">
        <p>
          Your location:{" "}
          <span className="location-text">
            {location ? location : "Unable to locate"}
          </span>
        </p>
        <button>Confirm</button>
      </div>
      <form className="search-form">
        <input
          type="search"
          className="searchbar"
          placeholder="Search for another city..."
        />
      </form>
    </>
  );
};

export default Home;
