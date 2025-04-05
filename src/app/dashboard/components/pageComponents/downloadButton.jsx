
const DownloadData = async () => {
  const filterString = "ENTER";
  try {
    const response = await fetch("/api/fetch-data-for-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filterString }),
    });
    if (!response.ok) throw new Error("Failed to download CSV");

    const data = await response.json();
    console.log("CSV Data:", data);
  } catch (err) {
    console.error("CSV Download Error:", err);
  }
};

export default function DownloadButtons() {
  return (
      <div>
         <button
         style={{
          background: "#87CEEB", 
          width: "200px",  
          whiteSpace: "normal", 
          wordWrap: "break-word",
          textAlign: "center", 
          padding: "10px"}}>
          Download Charts <br/>(Downloads charts as pdf with their data)
          </button>
         <button onClick={DownloadData} 
         style={{ 
          background: "#87CEEB", 
          width: "200px",  
          whiteSpace: "normal", 
          wordWrap: "break-word",
          textAlign: "center", 
          padding: "10px" }}>
          Download Data <br/>(Downloads all data related to network and/or city as csv)
          </button>
        </div>
    );
  }
  