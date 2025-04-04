
const DownloadCharts = async () => {

}
const DownloadData = async () => {
  const filterString = "WHERE d.city = 'ENTER'";
  try {
    const response = await fetch("/api/fetch-data-for-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filterString }),
    });

    if (!response.ok) throw new Error("Failed to download CSV");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "energy_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("CSV Download Error:", err);
  }
};

export default function DownloadButtons() {
  
    return (
  <div>
         <button onClick={DownloadCharts}
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
  