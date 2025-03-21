"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
//exampleChart2
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6699", "#33CC33", "#FF9900"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Updated names to be the same between inner and outer groups
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group B", value: 400 },

];

// const data02 = [
//   { name: "Group A", value: 100 },
//   { name: "Group A", value: 300 },
//   { name: "Group B", value: 100 },
//   { name: "Group B", value: 80 },
//   { name: "Group B", value: 40 },
// ];

export default class CustomPieChart extends PureComponent {
  render() {
    return (
      <div style={{ width: "100%", minHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ResponsiveContainer width="50%" height={400}>
          <PieChart>
            {/* Outer Pie */}
            <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={renderCustomizedLabel}>
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* Inner Pie */}
            {/* <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={90} outerRadius={110} label>
              {data02.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie> */}

            {/* Legend */}
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}