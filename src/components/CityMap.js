import { useMap, TileLayer } from "react-leaflet";

const CityMap = (props) => {
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

export default CityMap;
