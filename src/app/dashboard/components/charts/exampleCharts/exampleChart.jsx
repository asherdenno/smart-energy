"use client";
import React from "react";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { year: 2015, gas: 4000, electricity: 2400 },
  { year: 2016, gas: 3000, electricity: 1398 },
  { year: 2017, gas: 2000, electricity: 9800 },
  { year: 2018, gas: 2780, electricity: 3908 },
  { year: 2019, gas: 1890, electricity: 4800 },
  { year: 2020, gas: 2390, electricity: 3800 },
];

const ExampleChart = () => {
  const [graphData, setGraphData] = React.useState([]);
  
  const formatData = (rawData) => {
    const formattedData = [];

    rawData.forEach(item => {
      let existingYear = formattedData.find(entry => entry.year === item.year);
      if (!existingYear) {
        existingYear = { year: item.year, electricity: 0, gas: 0 };
        formattedData.push(existingYear);
      }
      existingYear[item.electric_or_gas.toLowerCase()] = item.total_annual_consume;
    });

    return formattedData.map(item => ({
      year: item.year,
      electricity: isNaN(item.electricity) ? 0 : item.electricity,
      gas: isNaN(item.gas) ? 0 : item.gas,
    }));
  }

  const fetchData = async () => {
    try {
      const res = await fetch('/api/usage-sum-per-year', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: 1 }),
      });
      if (!res.ok) throw new Error('Error fetching sum per year');
      const data = await res.json();
      const onlyData = data.data;
      console.log("onlyData:", onlyData);
      const formattedData = formatData(onlyData);
      setGraphData(formattedData);
      console.log("formattedData:", formattedData);
    }
    catch (error) {
      console.error('Error fetching sum per year:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }
  , []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "90vw", maxWidth: "100%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="electricity" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="gas" stroke="#82ca9d" strokeWidth={2} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExampleChart;


