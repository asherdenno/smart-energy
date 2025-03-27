"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6699", "#33CC33", "#FF9900"];
const RADIAN = Math.PI / 180;

const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.65; 
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


const renderOuterLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const radius = outerRadius + 20; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"} 
      dominantBaseline="central"
      fontSize="14px"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const dataOuter = [
  { name: "2015", value: 400 },
  { name: "2016", value: 300 },
  { name: "2017", value: 300 },
  { name: "2018", value: 200 },
  { name: "2019", value: 400 },
  { name: "2020", value: 400 },
];

const dataInner = [
  { name: "2015", value: 100 },
  { name: "2016", value: 300 },
  { name: "2017", value: 100 },
  { name: "2018", value: 80 },
  { name: "2019", value: 40 },
  { name: "2020", value: 40 },
];

export default class CustomPieChart extends PureComponent {
  render() {
    const { showElectric, showGas } = this.props;
    return (
      <div style={{ width: "100%", minHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ResponsiveContainer width="50%" height={400}>
          <PieChart>
            {showElectric && <Pie 
              data={dataInner} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              innerRadius={90} 
              outerRadius={110} 
              label={renderOuterLabel} 
              labelLine
              >
              {dataInner.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>}

            {showGas && <Pie 
              data={dataOuter} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              label={renderInnerLabel} 
              labelLine={false} 
            //   nameKey={"yearKeys"}
            >
              {dataOuter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>}

                {/* <Legend verticalAlign="bottom" height={36} /> */}
                <Legend 
  verticalAlign="bottom" 
  height={36} 
  payload={dataOuter.map((entry, index) => ({
    value: entry.name, 
    type: "circle", 
    color: COLORS[index % COLORS.length]
  }))}
/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
