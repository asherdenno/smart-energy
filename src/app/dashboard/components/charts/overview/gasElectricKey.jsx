"use client"
import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data01 = [
  { name: 'Gas', value: 400 },

];
const data02 = [
  { name: 'Electric', value: 100 },
  
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-of-two-levels-gor24';

  render() {
    return (
        <div style={{ 
            width: "100%",
            minHeight: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", padding: "20px",
            boxSizing: "border-box" 
            }}>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
            </div>
    );
  }
}