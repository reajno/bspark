import { useRef } from "react";
import Radar from "radar-sdk-js";

const useMarkers = (map) => {
  const markersRef = useRef(new Map());

  const addMarkers = (parkingLocations) => {
    try {
      parkingLocations.map((location) => {
        const key = `${location.meter_no}`;

        // ADD NEW MARKERS
        if (!markersRef.current.has(key)) {
          const marker = Radar.ui
            .marker({
              color: "#000257",
              width: 40,
              height: 80,
              popup: {
                html: `<strong>${location.street}</strong>
            <br>Bays: ${location.veh_bays}<br>Restrictions: ${
                  location.restrictions || "None"
                }`,
              },
            })
            .setLngLat([location.longitude, location.latitude])
            .addTo(map.current);

          // FLY TO MARKER ON CLICK
          marker.getElement().addEventListener("click", () => {
            map.current.flyTo({
              center: [location.longitude, location.latitude],
              zoom: 17,
              essential: true,
            });
          });

          markersRef.current.set(key, marker);
        }
      });
      return;
    } catch (error) {
      throw error;
    }
  };

  const clearMarkers = () => {
    if (markersRef.current.size > 0) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = new Map();
    }
    return;
  };

  return { addMarkers, clearMarkers };
};
export default useMarkers;
