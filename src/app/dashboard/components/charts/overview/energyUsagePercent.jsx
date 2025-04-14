"use client";
import React, { PureComponent, useEffect } from "react";
import { useState,  useContext } from "react";
import { NavbarContext } from "@/app/dashboard/context/NavbarContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import styles from "@/app/page.module.css";

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

export default class EnergyUsagePercent extends PureComponent {
  static contextType = NavbarContext;
  constructor(props) {
    super(props);
    this.state = {
      dataOuter: [],
      dataInner: [],
      loading: true,
      prevAnnualEnergyData: null,
    };
  }

  resetGraph = () => {
    this.setState({ dataOuter: [], dataInner: [] });
  }

  updateGraph = (items) => {
    const newDataInner = [];
    const newDataOuter = [];
    items.forEach((item) => {
      if (item.electric_or_gas === "Electricity") {
        newDataInner.push({ name: item.year, value: item.total_annual_consume });
      } else if (item.electric_or_gas === "Gas") {
        newDataOuter.push({ name: item.year, value: item.total_annual_consume });
      } else {
        console.error("Invalid electric_or_gas value:", item.electric_or_gas);
      }
    })
    this.setState({ dataInner: newDataInner, dataOuter: newDataOuter });
  };

  componentDidMount() {
    const { annualEnergyData } = this.context;

    if (annualEnergyData && Array.isArray(annualEnergyData.data)) {
      this.updateGraph(annualEnergyData.data);
      this.setState({ loading: false, prevAnnualEnergyData: annualEnergyData });
    } else {
      console.log("Invalid data format:", annualEnergyData);
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { annualEnergyData } = this.context;
    if (!annualEnergyData) {
      this.setState({ loading: true });
    }
    if (annualEnergyData !== this.state.prevAnnualEnergyData && Array.isArray(annualEnergyData)) {
      this.resetGraph(); // Clear the graph data
      this.updateGraph(annualEnergyData); // Update the graph with new data
      this.setState({ prevAnnualEnergyData: annualEnergyData }, () => {
        this.setState({ loading: false});
      })
    }
  }

  render() {
    const { dataOuter, dataInner, loading } = this.state;
    const { showElectric, showGas, width } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className={styles.greyContainer+" energyChart"}>
      <div style={{ 
        width: width || "100%",
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", padding: "20px",
        boxSizing: "border-box", 
        display:"flex", 
        flexWrap:"wrap"
        }}>
        <ResponsiveContainer width="100%" height={400} style={{padding:"1%"}}>
          <h4>Yearly Energy Usage Percentages</h4>
          <PieChart>
            {showElectric && <Pie 
              data={this.state.dataInner} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              innerRadius={90} 
              outerRadius={110} 
              label={renderOuterLabel} 
              labelLine
              >
              {this.state.dataInner.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>}

            {showGas && <Pie 
              data={this.state.dataOuter} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              label={renderInnerLabel} 
              labelLine={false} 
            //   nameKey={"yearKeys"}
            >
              {this.state.dataOuter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>}

                {/* <Legend verticalAlign="bottom" height={36} /> */}
                <Legend 
  verticalAlign="bottom" 
  height={36} 
  payload={this.state.dataOuter.map((entry, index) => ({
    value: `${entry.name}`, 
    type: "circle", 
    color: COLORS[index % COLORS.length], 
  }))}
/>
          </PieChart>
        </ResponsiveContainer>
        <br></br>
        Inner circle: Electric <br></br>
        Outer circle: Gas
             </div>
      </div>
    );
  }
}
