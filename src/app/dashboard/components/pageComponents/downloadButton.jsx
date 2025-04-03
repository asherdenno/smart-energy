import { blue } from "@mui/material/colors";

const DownloadCharts = async () => {

}
const DownloadData = async () => {

}
export default function DownloadButtons() {
  
    return (
  <div>
         <button onClick={DownloadCharts}>Download Charts (Downloads charts as pdf with their data)</button>
         <button onClick={DownloadData} style={{background:"blue"}}>Download Data (Downloads all data related to network and/or city as csv)</button>
        </div>
    );
  }
  