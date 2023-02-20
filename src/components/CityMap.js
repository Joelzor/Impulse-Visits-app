import { useMap, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const CityMap = ({ center, zoom, activities, plan }) => {
  const map = useMap();
  map.getCenter();
  map.setView(center, zoom);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {plan && (
        <Marker position={center}>
          <Popup>{plan.name}</Popup>
        </Marker>
      )}

      {activities &&
        activities.map((activity) => {
          const {
            name,
            xid,
            point: { lon, lat },
          } = activity;
          return (
            <div key={xid}>
              <Marker position={[lat, lon]}>
                <Popup>
                  {name}
                  <br />
                  <Link to={`/activities/${xid}`}>To activity page</Link>
                </Popup>
              </Marker>
            </div>
          );
        })}
    </>
  );
};

export default CityMap;
