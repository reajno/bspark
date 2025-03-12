import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

import MapSearchBar from "./MapSearchBar";

// CHANGE API_KEY LOCATION TO ENV
const API_KEY = "prj_test_pk_cb82d2a47c0d6296bf414c4936df9e2e8630234d";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      Radar.initialize(API_KEY);

      const map = Radar.ui.map({
        container: mapRef.current,
        style: "radar-default-v1",
        center: { lat: -27.4698, lng: 153.0251 },
        zoom: 12,
      });
      // REMOVE DEFAULT NAVIGATION
      const navControl = map._controls.find(
        (control) =>
          control._container &&
          control._container.classList.contains("maplibregl-ctrl") &&
          control._container.classList.contains("maplibregl-ctrl-group")
      );
      if (navControl) map.removeControl(navControl);

      mapRef.current = map;
    };

    initializeMap();
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
      <MapSearchBar mapRef={mapRef} />
    </>
  );
};
export default Map;
