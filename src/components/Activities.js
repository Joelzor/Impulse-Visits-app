const apiKey = process.env.REACT_APP_API_KEY_OPEN_TRIP_MAP;

const Activities = () => {
  // const pageLength = 5; // number of objects per page
  // let offset = 0; // offset from first object in the list
  // let count; // total objects count
  // apiGet(
  //   "radius",
  //   `radius=1000&limit=${pageLength}&offset=${offset}&lon=${userLongitude}&lat=${userLatitude}&rate=2&format=${count}`
  // );

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
  return <>Activities Component</>;
};

export default Activities;
