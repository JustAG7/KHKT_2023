import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker icon image
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configure the marker icon path
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41], // icon position
  popupAnchor: [1, -34], // popup position
  shadowSize: [41, 41], // shadow size
});

L.Marker.prototype.options.icon = DefaultIcon;

function isMarkerInsidePolygon(markerPosition, polygonCoordinates) {
  const x = markerPosition[0];
  const y = markerPosition[1];

  let inside = false;
  for (
    let i = 0, j = polygonCoordinates.length - 1;
    i < polygonCoordinates.length;
    j = i++
  ) {
    const xi = polygonCoordinates[i][0];
    const yi = polygonCoordinates[i][1];
    const xj = polygonCoordinates[j][0];
    const yj = polygonCoordinates[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

export default function Map() {
  const [mapCenter, setMapCenter] = useState({
    lat: 16.030615,
    lng: 108.214129,
  });
  const [mapZoom, setMapZoom] = useState(20);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log(latitude, longitude);
          setPosition({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          setMapZoom(20);
          // console.log(position, mapCenter)
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported");
    }
  }, []);
  useEffect(() => {
    console.log(position);
  }, [position]);
  return (
    <>
      {mapCenter && (
        <MapContainer
          center={position || mapCenter} // Use position if available, otherwise fallback to mapCenter
          zoom={mapZoom}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "600px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon
            positions={[
              [16.030601, 108.213715],
              [16.029904, 108.213861],
              [16.03051, 108.214921],
              [16.030893, 108.214613],
            ]}
            color="blue"
          />

          {position &&
            isMarkerInsidePolygon(
              [position.lat, position.lng],
              [
                [16.030601, 108.213715],
                [16.029904, 108.213861],
                [16.03051, 108.214921],
                [16.030893, 108.214613],
              ]
            ) && (
              <Marker position={position}>
                <Popup>You are inside the polygon</Popup>
              </Marker>
            )}

          {position &&
            !isMarkerInsidePolygon(
              [position.lat, position.lng],
              [
                [16.030601, 108.213715],
                [16.029904, 108.213861],
                [16.03051, 108.214921],
                [16.030893, 108.214613],
              ]
            ) && (
              <Marker position={position}>
                <Popup>You are outside the polygon</Popup>
              </Marker>
            )}
        </MapContainer>
      )}
    </>
  );
}
