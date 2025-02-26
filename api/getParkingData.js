const handler = async (req, res) => {
  try {
    const response = await fetch(
      "https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/brisbane-parking-meters/records?select=meter_no%2Cstreet%2Csuburb%2Crestrictions%2Coperational_day%2Coperational_time%2Cloc_desc%2Cveh_bays%2Clongitude%2Clatitude&limit=10"
    );
    const { results } = await response.json();
    res.status(200).json(results);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "An error occured while fetching data" });
  }
};

export default handler;
