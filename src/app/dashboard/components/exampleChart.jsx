"use client";

import React from "react";
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
            data={data}
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


