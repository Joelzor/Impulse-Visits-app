import { useMap, TileLayer, Marker, Popup } from "react-leaflet";

const CityMap = ({ center, zoom, activities }) => {
  const map = useMap();
  map.getCenter();
  map.setView(center, zoom);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {activities.map((activity) => {
        const {
          name,
          point: { lon, lat },
        } = activity;
        return (
          <>
            <Marker position={[lat, lon]}>
              <Popup>{name}</Popup>
            </Marker>
          </>
        );
      })}
    </>
  );
};

export default CityMap;
