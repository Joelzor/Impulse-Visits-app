import { useState, useEffect } from "react";

const Home = () => {
  // const [userLatitude, setUserLatitude] = useState(null);
  // const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  return <>Home Component</>;
};

export default Home;
