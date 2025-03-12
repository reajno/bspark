import Radar from "radar-sdk-js";
import { useEffect, useRef } from "react";
import useMarkers from "../hooks/useMarkers";

const MapSearchBar = ({ mapRef }) => {
  const autocompleteRef = useRef(null);

  const { addDestinationMarker } = useMarkers(mapRef);

  useEffect(() => {
    const renderMapSearchBar = () => {
      if (mapRef.current && autocompleteRef.current) {
        Radar.ui.autocomplete({
          container: autocompleteRef.current,
          showMarkers: true,
          markerColor: "#ACBDC8",
          responsive: true,
          width: "600px",
          maxHeight: "600px",
          placeholder: "Search destination",
          limit: 8,
          minCharacters: 3,
          near: { latitude: -27.4698, longitude: 153.0251 },
          layers: ["place", "address", "coarse"],
          countryCode: "AU",
          onSelection: (destination) => {
            addDestinationMarker(destination);
          },
        });
      }
    };

    renderMapSearchBar();
  }, []);

  return (
    <div
      ref={autocompleteRef}
      style={{ display: "flex", justifyContent: "center" }}
    />
  );
};
export default MapSearchBar;
