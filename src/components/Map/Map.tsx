import React from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapProps } from "../../types/types";
import { useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const CenterMapOnPopup: React.FC<{
  location: { latitude: number; longitude: number };
}> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([location.latitude, location.longitude], map.getZoom(), {
      animate: true,
    });
  }, [location, map]);

  return null;
};

const Map: React.FC<MapProps> = ({ location }) => {
  return (
    <>
      <MapContainer
        className="map-container"
        center={[location.latitude, location.longitude]}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            Event is here! <br /> Come on by.
          </Popup>
        </Marker>
        <CenterMapOnPopup location={location} />
      </MapContainer>
    </>
  );
};

export default Map;
