"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6699", "#33CC33", "#FF9900"];
const RADIAN = Math.PI / 180;

// Label for OUTER ring (percentages inside slices)
const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.65; // Moves text inside slices
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14px"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Label for INNER ring (percentages outside with leader lines)
const renderOuterLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const radius = outerRadius + 20; // Moves text outside the pie
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"} // Adjusts left/right placement
      dominantBaseline="central"
      fontSize="14px"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Updated data
const dataInner = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 400 },
];

const dataOuter = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 100 },
  { name: "Group D", value: 80 },
  { name: "Group E", value: 40 },
];

export default class CustomPieChart extends PureComponent {
  render() {
    return (
      <div style={{ width: "100%", minHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ResponsiveContainer width="50%" height={400}>
          <PieChart>
            {/* Inner Pie - Percentages outside with leader lines */}
            <Pie 
              data={dataOuter} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              innerRadius={90} 
              outerRadius={110} 
              label={renderOuterLabel} 
              labelLine // Enables lines pointing out
            >
              {dataOuter.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* Outer Pie - Percentages inside slices */}
            <Pie 
              data={dataInner} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              label={renderInnerLabel} 
              labelLine={false} // No lines for outer ring
            >
              {dataInner.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* Legend */}
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
