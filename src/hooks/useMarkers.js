import { useRef, useState, useEffect } from "react";
import Radar from "radar-sdk-js";
import useParkingData from "./useParkingData";
import useParkingStatus from "./useParkingStatus";

const useMarkers = (mapRef) => {
  const parkingMarkersRef = useRef(new Map());
  const destinationMarkerRef = useRef(null);

  const [destination, setDestination] = useState(null);

  const { parkingLocations } = useParkingData(
    destination ? destination.latitude : null,
    destination ? destination.longitude : null
  );

  const { getStatus } = useParkingStatus();

  useEffect(() => {
    if (destination && parkingLocations && parkingLocations.length > 0) {
      clearParkingMarkers();
      addParkingMarkers(parkingLocations);
    }
  }, [destination, parkingLocations]);

  const addParkingMarkers = (locations) => {
    try {
      locations.map((location) => {
        const key = `${location.meter_no}`;
        const parkingStatus = getStatus(location.operational_time);

        // ADD NEW MARKERS
        if (!parkingMarkersRef.current.has(key)) {
          const marker = Radar.ui
            .marker({
              color: parkingStatus.isFree ? "#51b77b" : "#db3d3a",
              width: 40,
              height: 80,
              popup: {
                html: `<strong>${location.street}</strong>
            <br>Bays: ${location.veh_bays}<br>Restrictions: ${
                  location.restrictions || "None"
                } <br> Distance: ${Number.parseInt(location.distance)}m
                <br>
                <a 
                href="https://www.google.com/maps?q=${location.latitude},${
                  location.longitude
                }"
                target="_blank" rel="noopener noreferrer"
                >Get Directions (Google Maps)</a>
                
                `,
              },
            })
            .setLngLat([location.longitude, location.latitude])
            .addTo(mapRef.current);

          // FLY TO MARKER ON CLICK
          marker.getElement().addEventListener("click", () => {
            mapRef.current.flyTo({
              center: [location.longitude, location.latitude],
              zoom: 17,
              essential: true,
            });
          });

          parkingMarkersRef.current.set(key, marker);
        }
      });

      // FIT MARKERS TO MAP BOUNDS
      if (mapRef.current) {
        mapRef.current.fitToMarkers({
          padding: 50,
          maxZoom: 17,
          duration: 1000,
        });
      }

      return;
    } catch (error) {
      throw error;
    }
  };

  const clearParkingMarkers = () => {
    if (parkingMarkersRef.current.size > 0) {
      parkingMarkersRef.current.forEach((marker) => marker.remove());
      parkingMarkersRef.current = new Map();
    }
    return;
  };

  const addDestinationMarker = (destination) => {
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    const marker = Radar.ui
      .marker({
        color: "#b85343",
      })
      .setLngLat([destination.longitude, destination.latitude])
      .addTo(mapRef.current);

    setDestination(destination);

    destinationMarkerRef.current = marker;
  };

  return { clearParkingMarkers, addDestinationMarker };
};
export default useMarkers;
