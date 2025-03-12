const handler = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const response =
      await fetch(`https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/brisbane-parking-meters/records?
      select=meter_no,street,suburb,restrictions,operational_day,operational_time,loc_desc,veh_bays,max_stay_hrs,latitude,longitude,
      distance(geo_point_2d,GEOM'POINT(${longitude} ${latitude})') as distance
      &order_by=distance(geo_point_2d,GEOM'POINT(${longitude} ${latitude})')
      &limit=10
      &having=distance < 1000`);
    const { results } = await response.json();
    res.status(200).json(results);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "An error occured while fetching data" });
  }
};

export default handler;
