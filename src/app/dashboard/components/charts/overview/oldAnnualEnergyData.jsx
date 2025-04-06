"use client"
import React,  { useState, PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

const GAS_TO_KWH_MULTIPLIER = 11.164;

const fetchData = async (account_id, signal) => {
  try {
    const res = await fetch('/api/usage-sum-per-year', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id }),
      signal,
    });
    if (!res.ok) throw new Error('Error fetching usage data');
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching usage data:', error);
    return [];
  }
}

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf';

//
constructor(props) {
    super(props);
    this.state = {
      showElectric: true,
      showGas: true,
      loading: true
    };
  }


componentDidMount() {
  this.abortController = new AbortController();

  fetchData("1", this.abortController.signal).then((response) => {
    const { data } = response;

    const AnnualEnergy = [];
    const AnnualDel = [];
    const AnnualLowtarif = [];

    data.forEach((item) => {
      let yearData = AnnualEnergy.find((entry) => entry.name === item.year);
      let yearDelData = AnnualDel.find((entry) => entry.name === item.year);
      let yearLowTarifData = AnnualLowtarif.find((entry) => entry.name === item.year);

      if (!yearData) {
        yearData = { name: item.year, Electric: null, Gas: null };
        AnnualEnergy.push(yearData);
      }
      if (!yearDelData) {
        yearDelData = { name: item.year, "Electric Delivery Percentage": null, "Gas Delivery Percentage": null };
        AnnualDel.push(yearDelData);
      }
      if (!yearLowTarifData) {
        yearLowTarifData = { name: item.year, "Electric Low Tariff Consume": null, "Gas Low Tariff Consume": null };
        AnnualLowtarif.push(yearLowTarifData);
      }

      if (item.electric_or_gas === "Electricity") {
        yearData.Electric = item.total_annual_consume;
        yearDelData["Electric Delivery Percentage"] = item.total_delivery_perc;
        yearLowTarifData["Electric Low Tariff Consume"] = item.total_annual_consume_lowtarif_perc;
      } else if (item.electric_or_gas === "Gas") {
        yearData.Gas = item.total_annual_consume;
        yearDelData["Gas Delivery Percentage"] = item.total_delivery_perc;
        yearLowTarifData["Gas Low Tariff Consume"] = item.total_annual_consume_lowtarif_perc;
      }
    });

      this.setState({ AnnualEnergy, AnnualDel, AnnualLowtarif, loading: false });
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Error fetching data:")
      }
      this.setState({ loading: false });
    })
  }

  componentWillUnmount() {
    if (this.abortController) {
      console.log("Aborting fetch");
      this.abortController.abort(); // Cancel the API call
    }
  }

  render() {
    const { showElectric, showGas, loading } = this.state;
    console.log("Show electric:", showElectric);
    console.log("Show gas:", showGas);
    console.log("Loading:", loading);
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div style={{ width: '100%' }}>
        <h4>Annual Energy Consumption</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={this.state.AnnualEnergy}
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

              }} />
            {showElectric && <Area type="monotone" dataKey="Electric" stroke="#8884d8" fill="#8884d8" />}
            {showGas && <Area type="monotone" dataKey="Gas" stroke="#82ca9d" fill="#82ca9d" />}
            <Brush />
          </AreaChart>
        </ResponsiveContainer>

        <h4>Annual Energy Delivery Percentage</h4>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={this.state.AnnualDel}
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
              }} />
            {showElectric && <Line type="monotone" dataKey="Electric Delivery Percentage" stroke="#8884d8" fill="#8884d8" />}
            {showGas && <Line type="monotone" dataKey="Gas Delivery Percentage" stroke="#82ca9d" fill="#82ca9d" />}
          </LineChart>
        </ResponsiveContainer>
        <h4>Annual Energy Consumption Percentage During Low Tarif Hours</h4>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={this.state.AnnualLowtarif}
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
              }} />
            {showElectric && <Line type="monotone" dataKey="Electric Low Tariff Consume" stroke="#8884d8" fill="#8884d8" />}
            {showGas && <Line type="monotone" dataKey="Gas Low Tariff Consume" stroke="#82ca9d" fill="#82ca9d" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}




