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
 
  // for (let i = 0; i < energyCharts.length; i++) {
  //   const element = energyCharts[i];
  //   const chartTitles = ["Gas Usage", "Electric Usage", "Water Usage"];
  
  //   // Insert title
  //   pdf.setFontSize(14);
  //   pdf.setFont("helvetica", "bold");
  //   pdf.text(chartTitles[i] || `Chart ${i + 1}`, padding, yOffset);
  //   yOffset += 15;
  
  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL('image/png');
  
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const imgWidth = pageWidth - 2 * padding;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //   if (i !== 0 && yOffset + imgHeight > pdf.internal.pageSize.getHeight()) {
  //     pdf.addPage();
  //     yOffset = padding;
  //   }
  
  //   pdf.addImage(imgData, 'PNG', padding, yOffset, imgWidth, imgHeight);
  //   yOffset += imgHeight + padding;
  // }

  const chartData = dummyAnnualData;
  


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
  a.download = 'annual energy data.csv';
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
  