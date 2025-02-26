import transformData from "../src/functions/transformData";

function App() {
  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/getParkingData");
      const data = await response.json();
      const result = await transformData(data);
      console.log(result);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h1>bspark</h1>
      <div>
        <button onClick={handleFetch}>Fetch Data</button>
      </div>
    </>
  );
}

export default App;
