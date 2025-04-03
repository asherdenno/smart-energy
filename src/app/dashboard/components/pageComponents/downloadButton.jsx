import { blue } from "@mui/material/colors";

const DownloadCharts = async () => {

}
const DownloadData = async () => {

}
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
  