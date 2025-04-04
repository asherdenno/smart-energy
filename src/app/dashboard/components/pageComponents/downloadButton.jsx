import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { dummyAnnualData } from '../navbar';

const DownloadCharts = async () => {
  const energyCharts = document.querySelectorAll('.energyChart');
  if (energyCharts.length === 0) {
    alert("Error: no charts found");
    return;
  }

  const pdf = new jsPDF('p', 'px', 'a4');
  const padding = 20;
  let yOffset = padding;

  for (let i = 0; i < energyCharts.length; i++) {
    const element = energyCharts[i];

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 2 * padding;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (i !== 0 && yOffset + imgHeight > pdf.internal.pageSize.getHeight()) {
      pdf.addPage();
      yOffset = padding;
    }

    pdf.addImage(imgData, 'PNG', padding, yOffset, imgWidth, imgHeight);
    yOffset += imgHeight + padding;
  }
  const chartData = dummyAnnualData;
  
  // const chartData = [
  //   { name: "2015", Electric: 4800, Gas: 3100, "Electric Delivery Percentage": 21, "Gas Delivery Percentage": 15, "Electric Low Tariff Consume": 38, "Gas Low Tariff Consume": 28 },
  //   { name: "2016", Electric: 4900, Gas: 3200, "Electric Delivery Percentage": 22, "Gas Delivery Percentage": 16, "Electric Low Tariff Consume": 39, "Gas Low Tariff Consume": 29 },
  //   { name: "2017", Electric: 5000, Gas: 3300, "Electric Delivery Percentage": 23, "Gas Delivery Percentage": 17, "Electric Low Tariff Consume": 40, "Gas Low Tariff Consume": 30 },
  //   { name: "2018", Electric: 5100, Gas: 3400, "Electric Delivery Percentage": 24, "Gas Delivery Percentage": 18, "Electric Low Tariff Consume": 41, "Gas Low Tariff Consume": 31 },
  //   { name: "2019", Electric: 5200, Gas: 3500, "Electric Delivery Percentage": 25, "Gas Delivery Percentage": 19, "Electric Low Tariff Consume": 42, "Gas Low Tariff Consume": 32 },
  //   { name: "2020", Electric: 5300, Gas: 3600, "Electric Delivery Percentage": 26, "Gas Delivery Percentage": 20, "Electric Low Tariff Consume": 43, "Gas Low Tariff Consume": 33 },
  // ];


    if (chartData.length > 0) {
  autoTable(pdf, {
    startY: yOffset + 10,
    head: [Object.keys(chartData[0])], 
    body: chartData.map(row => Object.values(row)), 
    theme: "grid",
    styles: { fontSize: 8, cellPadding: 2 },
  });
    }

  pdf.save('annual energy data.pdf');

}

const DownloadData = async () => {
  const res = await fetch('/api/download-annual-energy-data');
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'filtered_data.csv';
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
  // const filterString = "WHERE d.city = 'ENTER'";
  // try {
  //   const response = await fetch("/api/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ filterString }),
  //   });

  //   if (!response.ok) throw new Error("Failed to download CSV");

  //   const blob = await response.blob();
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "energy_data.csv";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // } catch (err) {
  //   console.error("CSV Download Error:", err);
  // }
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
  