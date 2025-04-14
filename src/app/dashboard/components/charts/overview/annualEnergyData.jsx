"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { NavbarContext } from '@/app/dashboard/context/NavbarContext';
import styles from "@/app/page.module.css";
import { Skeleton } from '@mui/material';

const GAS_TO_KWH_MULTIPLIER = 11.164;

const EnergyUsageCharts = ({ showElectric, showGas, width }) => {
  const { annualEnergyData, setAnnualEnergyData } = React.useContext(NavbarContext);
  const [loading, setLoading] = useState(true);
  const [AnnualEnergy, setAnnualEnergy] = useState([]);
  const [AnnualDel, setAnnualDel] = useState([]);
  const [AnnualLowtarif, setAnnualLowtarif] = useState([]);

  useEffect(() => {
    const updateGraph = (data) => {
      const energyData = [];
      const delData = [];
      const lowtarifData = [];

      data.forEach((item) => {
        let yearData = energyData.find((entry) => entry.name === item.year);
        let yearDelData = delData.find((entry) => entry.name === item.year);
        let yearLowTarifData = lowtarifData.find(
          (entry) => entry.name === item.year
        );

        if (!yearData) {
          yearData = { name: item.year, Electric: null, Gas: null };
          energyData.push(yearData);
        }
        if (!yearDelData) {
          yearDelData = {
            name: item.year,
            "Electric Delivery Percentage": null,
            "Gas Delivery Percentage": null,
          };
          delData.push(yearDelData);
        }
        if (!yearLowTarifData) {
          yearLowTarifData = {
            name: item.year,
            "Electric Low Tariff Consumption": null,
            "Gas Low Tariff Consume": null,
          };
          lowtarifData.push(yearLowTarifData);
        }

        if (item.electric_or_gas === "Electricity") {
          yearData.Electric = item.total_annual_consume;
          yearDelData["Electric Delivery Percentage"] =
            item.total_delivery_perc;
          yearLowTarifData["Electric Low Tariff Consumption"] =
            item.total_annual_consume_lowtarif_perc;
        } else if (item.electric_or_gas === "Gas") {
          yearData.Gas = item.total_annual_consume;
          yearDelData["Gas Delivery Percentage"] = item.total_delivery_perc;
          yearLowTarifData["Gas Low Tariff Consume"] =
            item.total_annual_consume_lowtarif_perc;
        }
      });

      setAnnualEnergy(energyData);
      setAnnualDel(delData);
      setAnnualLowtarif(lowtarifData);
      setLoading(false);
    };
    if (annualEnergyData) {
      console.log("Using context data:", annualEnergyData);
      updateGraph(annualEnergyData);
      return;
    }
    setLoading(true);
    console.log("No data");
  }, [annualEnergyData]);

  if (loading) {
    return (
      <>
        <div className={styles.greyContainer + " energyChart"}>
          <Skeleton animation="wave" variant='text' height={40} width={width || 200} />
          <Skeleton animation="wave" variant='rectangular' height={100} width={width || 200} sx={{ alignSelf: "flex-end" }} />
          <Skeleton animation="wave" variant='text' height={70} width={width || 200} sx={{ alignSelf: "flex-end" }} />
        </div>
        <div className={styles.greyContainer + " energyChart"} style={{ width: '100%' }}>
          <Skeleton variant='rectangular' height={200} width={width || 300} />
        </div>
        <div className={styles.greyContainer + " energyChart"} style={{ width: '100%' }}>
          <Skeleton variant='rectangular' height={200} width={width || 300} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.greyContainer + " energyChart"} style={{width: width || 500}}>
        <h4>Annual Energy Consumption</h4>
        <ResponsiveContainer width="100%" height={200} style={{ padding: "1%" }} >
          <AreaChart
            width={500}
            height={200}
            data={AnnualEnergy}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name.includes("Electric")) {
                  return [`${value} kWh`, name];
                }
                if (name.includes("Gas")) {
                  return [`${value} m³`, name];
                }
              }}
            />
          {showElectric && (
            <Area type="monotone" dataKey="Electric" stroke="#8884d8" fill="#8884d8" />
          )}
          {showGas && <Area type="monotone" dataKey="Gas" stroke="#82ca9d" fill="#82ca9d" />}
          <Brush />
        </AreaChart>
      </ResponsiveContainer>
          </div>

          <div className={styles.greyContainer+" energyChart"}>

      
      <h4>Annual Energy Delivery Percentage</h4>
      <ResponsiveContainer width="100%" height={200} style={{padding:"1%"}}>
        <LineChart
          width={500}
          height={200}
          data={AnnualDel}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip
            formatter={(value, name) => {
              return [`${value} %`, name];
            }}
            />
          {showElectric && (
            <Line
            type="monotone"
            dataKey="Electric Delivery Percentage"
            stroke="#8884d8"
            fill="#8884d8"
            />
          )}
          {showGas && (
            <Line
            type="monotone"
            dataKey="Gas Delivery Percentage"
            stroke="#82ca9d"
            fill="#82ca9d"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
          </div>
          <div className={styles.greyContainer+" energyChart"}>
        <h4>Annual Energy Consumption Percentage During Low Tariff Hours</h4>
      <ResponsiveContainer width="100%" height={200} style={{padding:"1%"}}>
        <LineChart
          width={500}
          height={200}
          data={AnnualLowtarif}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip
            formatter={(value, name) => {
              return [`${value} %`, name];
            }}
          />
          {showElectric && (
            <Line
              type="monotone"
              dataKey="Electric Low Tariff Consumption"
              stroke="#8884d8"
              fill="#8884d8"
            />
          )}
          {showGas && (
            <Line
              type="monotone"
              dataKey="Gas Low Tariff Consume"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      </div>

      {/* <div className={styles.greyContainer + " energyChart"} style={{width: width || 200}}>


        <h4>Annual Energy Delivery Percentage</h4>
        <ResponsiveContainer width="100%" height={200} style={{ padding: "1%" }}>
          <LineChart
            width={500}
            height={200}
            data={AnnualDel}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip
              formatter={(value, name) => {
                return [`${value} %`, name];
              }}
            />
            {showElectric && (
              <Line
                type="monotone"
                dataKey="Electric Delivery Percentage"
                stroke="#8884d8"
                fill="#8884d8"
              />
            )}
            {showGas && (
              <Line
                type="monotone"
                dataKey="Gas Delivery Percentage"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.greyContainer + " energyChart"} style={{width: width || 200}}>
        <h4>Annual Energy Consumption Percentage During Low Tariff Hours</h4>
        <ResponsiveContainer width="100%" height={200} style={{ padding: "1%" }}>
          <LineChart
            width={500}
            height={200}
            data={AnnualLowtarif}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip
              formatter={(value, name) => {
                return [`${value} %`, name];
              }}
            />
            {showElectric && (
              <Line
                type="monotone"
                dataKey="Electric Low Tariff Consume"
                stroke="#8884d8"
                fill="#8884d8"
              />
            )}
            {showGas && (
              <Line
                type="monotone"
                dataKey="Gas Low Tariff Consume"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </>
  );
};

export default EnergyUsageCharts;