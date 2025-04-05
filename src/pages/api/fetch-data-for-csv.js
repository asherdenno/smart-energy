import { sql } from "@/lib/db";
import { fetchFilteredEnergyData } from "@/lib/db";

const convertToCsv = (data) => {

}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { filterString } = req.body;
      const data = await fetchFilteredEnergyData(filterString);
      console.log("fetchFilteredEnergyData");
      console.log(data);
      res.status(200).json(data);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
