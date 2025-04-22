"use client";
import React, { PureComponent, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
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
      error: false,
      prevAnnualEnergyData: null,
    };
  }

  resetGraph = () => {
    this.setState({ dataOuter: [], dataInner: [] });
  }

  groupDataByYear = (items) => {
    const groupedData = {};
    items.forEach((item) => {
      const year = item.year;
      if (!groupedData[year]) {
        groupedData[year] = {
          electric: 0,
          gas: 0,
        };
      }
      if (item.electric_or_gas === "Electricity") {
        groupedData[year].electric += item.total_annual_consume;
      } else if (item.electric_or_gas === "Gas") {
        groupedData[year].gas += item.total_annual_consume;
      } else {
        console.error("Invalid electric_or_gas value:", item.electric_or_gas);
      }
    });
    const result = [];
    for (const year in groupedData) {
      result.push({
        year: year,
        electric: groupedData[year].electric,
        gas: groupedData[year].gas,
        total: groupedData[year].electric + groupedData[year].gas,
      });
    }
    return result;
  };

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

  updateGraphWithGroupedData = (items) => {
    const groupedData = this.groupDataByYear(items);
    const newDataInner = [];
    const newDataOuter = [];
    groupedData.forEach((item) => {
      newDataInner.push({
          name: item.year,
          value: item.electric, 
      });

      // For gas (outer circle)
      newDataOuter.push({
          name: item.year,
          value: item.gas,
        });
      });
      this.setState({
          dataInner: newDataInner,
          dataOuter: newDataOuter,
      });
      if (newDataInner.length === 0 && newDataOuter.length === 0) {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }
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
      this.resetGraph(); 
      // this.updateGraph(annualEnergyData);
      this.updateGraphWithGroupedData(annualEnergyData); 
      this.setState({ prevAnnualEnergyData: annualEnergyData }, () => {
        this.setState({ loading: false});
      })
    }
  }

  render() {
    const { dataInner, dataOuter,  loading } = this.state;
    const { showElectric, showGas, minWidth } = this.props;

    if (loading) {
      return (
        <div className={styles.greyContainer+" energyChart"} style={{
          minWidth: minWidth || "100%",
          maxWidth: "400px",
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", padding: "20px",
          boxSizing: "border-box"
        }}>
          <Skeleton animation="wave" variant="text" height="40px" width="100%"/>
          <Skeleton animation="wave" variant="rectangular" height="200px" width="100%"/>
          <Skeleton animation="wave" variant="text" height="40px" width="100%"/>
          <Skeleton animation="wave" variant="text" height="40px" width="100%"/>
        </div>
      )
    } else if (this.state.error === true) {
      return null;
    }
    return (
      <div className={styles.greyContainer+" energyChart"} style={{ 
        minWidth: minWidth || "100%",
        maxWidth: "400px",
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
            {showGas && <Pie 
              data={this.state.dataOuter} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              innerRadius={90} 
              outerRadius={110} 
              label={renderOuterLabel} 
              labelLine
              >
              {this.state.dataOuter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>}

            {showElectric && <Pie 
              data={this.state.dataInner} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              label={renderInnerLabel} 
              labelLine={false} 
            //   nameKey={"yearKeys"}
            >
              {this.state.dataInner.map((entry, index) => (
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
    );
  }
}
