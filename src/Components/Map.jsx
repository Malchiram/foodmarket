import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerMap from "../assets/waysfood/marker.png"
import L from "leaflet";
import { useContext } from "react";
import { UserContext } from "../utils/context/userContext";

export default function Map({ handleMapClick, selectedLat, selectedLng }) {

  const icon = L.icon({
    iconUrl: MarkerMap,
    iconSize: [38, 36],
  });


  function MapEvents() {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }
  // const centerMap = [-6.17781214899621, 106.82685538905109];
  const [state] = useContext(UserContext)
  const latUser = state?.user.location.split(",")[0]
  const lngUser = state?.user.location.split(",")[1]
  return (
    <>
      <div style={{ width: "100%", height: "100%", border: "1px solid grey" }}>
        <MapContainer
          center={[latUser, lngUser]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "400px", width: "100%" }}

        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=f9akE99fo56wfKEEjvcl"
          />
          <MapEvents />
          {selectedLat && selectedLng && (
            <Marker
              position={[selectedLat, selectedLng]}
              draggable={true}
              animate={true}
              icon={icon}
            >
              <Popup>Hey ! you found me</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

    </>
  );
}