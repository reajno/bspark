const handler = async (req, res) => {
  try {
    const response = await fetch(process.env.API_URL);
    const { results } = await response.json();
    res.status(200).json(results);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "An error occured while fetching data" });
  }
};

export default handler;
