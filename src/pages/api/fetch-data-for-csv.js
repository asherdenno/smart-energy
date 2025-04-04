import { sql } from "@/lib/db";
import { fetchFilteredEnergyData } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { filterString } = req.body;
    if (!filterString) {
      return res.status(400).json({ error: "Missing filterString parameter" });
    }

    const fetchFilteredDataForCSV = async (filterString) => {
        const data = await fetchFilteredEnergyData(filterString);
        console.log("fetchFilteredCSVData");
        return data;
    }
    
    const result = await sql.query(query);
    const data = result.recordset;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    // Set response headers for CSV
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="energy_data.csv"');

    // Stream CSV data to client
    const csvStream = stringify({ header: true });
    csvStream.pipe(res);

    data.forEach(row => csvStream.write(row));
    csvStream.end();
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to fetch and generate CSV" });
  }
}
