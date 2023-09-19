import React, { useState, useRef, useCallback, useEffect } from "react";
import { LoadScript, GoogleMap, Polygon, Marker } from "@react-google-maps/api";

import "../CSS/map.css";

export default function App() {
  // Store Polygon path in state
  const [path, setPath] = useState([]);

  // Store the user's current position
  const [currentPosition, setCurrentPosition] = useState(null);

  // Store the markers in state
  const [markers, setMarkers] = useState([]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  // Get the user's current location using geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        
        // Calculate a new polygon path near the current center
        const newPolygonPath = [
          { lat: position.coords.latitude + 0.01, lng: position.coords.longitude - 0.01 },
          { lat: position.coords.latitude - 0.01, lng: position.coords.longitude - 0.01 },
          { lat: position.coords.latitude - 0.01, lng: position.coords.longitude + 0.01 }
        ];
        setPath(newPolygonPath);
      },
      error => {
        console.error("Error getting user's location:", error);
      }
    );
  }, []);

  // Function to check if a marker is inside the polygon
  const checkMarkerInsidePolygon = (marker) => {
    if (window.google && window.google.maps && window.google.maps.geometry) {
      const point = new window.google.maps.LatLng(marker.lat, marker.lng);
      const polygon = new window.google.maps.Polygon({
        paths: path,
      });
      const isInside = window.google.maps.geometry.poly.containsLocation(point, polygon);
      return isInside;
    }
    return false;
  };

  const logMarkerLocation = (marker) => {
    const isInside = checkMarkerInsidePolygon(marker);
    if (isInside) {
      console.log(`Marker at (${marker.lat}, ${marker.lng}) is INSIDE the polygon.`);
    } else {
      console.log(`Marker at (${marker.lat}, ${marker.lng}) is OUTSIDE the polygon.`);
    }
  };

  // Add three sample markers
  useEffect(() => {
    if (currentPosition) {
      // Add three markers for testing (you can add more markers as needed)
      const marker0 = {
        lat: currentPosition.lat,
        lng: currentPosition.lng,
      }
      const marker1 = {
        lat: currentPosition.lat + 0.005,
        lng: currentPosition.lng + 0.005,
      };
      const marker2 = {
        lat: currentPosition.lat - 0.005,
        lng: currentPosition.lng - 0.005,
      };
      const marker3 = {
        lat: currentPosition.lat - 0.005,
        lng: currentPosition.lng + 0.005,
      };
      setMarkers([marker0, marker1, marker2, marker3]);
    }
  }, [currentPosition]);

  // Log the location of each marker when the path or markers change
  useEffect(() => {
    markers.forEach((marker) => {
      logMarkerLocation(marker);
    });
  }, [path, markers]);

  console.log("The path state is", path);

  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAPTw_Oe2OHhh72PwI1--sMypE4u0YsZQY"
        libraries={["geometry"]}
      >
        {currentPosition && (
          <GoogleMap
            mapContainerClassName="App-map"
            center={currentPosition}
            zoom={15}
            version="weekly"
            on
          >
            <Polygon
              editable
              draggable
              path={path}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
              onLoad={onLoad}
              onUnmount={onUnmount}
            />

            {/* Add markers to the map */}
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker}
                onClick={() => logMarkerLocation(marker)}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
}
