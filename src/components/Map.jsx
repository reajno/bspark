import { useEffect, useState, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

import useParkingData from "../hooks/useParkingData";
import useMarkers from "../hooks/useMarkers";

const API_KEY = "prj_test_pk_cb82d2a47c0d6296bf414c4936df9e2e8630234d";

const MapRadar = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const { parkingLocations } = useParkingData();
  const { addMarkers, clearMarkers } = useMarkers(map);

  useEffect(() => {
    const initializeMap = () => {
      Radar.initialize(API_KEY);

      if (mapContainerRef.current && !map.current) {
        map.current = Radar.ui.map({
          container: mapContainerRef.current,
          style: "radar-default-v1",
          center: { lat: -27.4698, lng: 153.0251 },
          zoom: 12,
        });

        // REMOVE DEFAULT NAVIGATION
        const navControl = map.current._controls.find(
          (control) =>
            control._container &&
            control._container.classList.contains("maplibregl-ctrl") &&
            control._container.classList.contains("maplibregl-ctrl-group")
        );
        if (navControl) map.current.removeControl(navControl);
      }
    };

    initializeMap();
  }, []);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
      <button onClick={() => addMarkers(parkingLocations)}>Add Markers</button>
      <button onClick={clearMarkers}>Clear Markers</button>
    </>
  );
};
export default MapRadar;
