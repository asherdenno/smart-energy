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
const fetchData = async (account_id) => {
  try {
    const res = await fetch('/api/usage-sum-per-year', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id }),
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
// const data = [
//   {
//     name: '2015',
//     Electric: 4000,
//     Gas: 2400,
//     amt: 2400,
//     "Electric Delivery Percentage": 10.5,
//     "Gas Delivery Percentage": 15.2,
//     "Electric Low Tariff Consume": 8.3,
//     "Gas Low Tariff Consume": 12.7,
//   },
//   {
//     name: '2016',
//     Electric: 3000,
//     Gas: 1398,
//     amt: 2210,
//     "Electric Delivery Percentage": 11.0,
//     "Gas Delivery Percentage": 16.4,
//     "Electric Low Tariff Consume": 7.8,
//     "Gas Low Tariff Consume": 13.1,
//   },
//   {
//     name: '2017',
//     Electric: 2000,
//     Gas: 9800,
//     amt: 2290,
//     "Electric Delivery Percentage": 9.7,
//     "Gas Delivery Percentage": 14.8,
//     "Electric Low Tariff Consume": 8.1,
//     "Gas Low Tariff Consume": 12.5,
//   },
//   {
//     name: '2018',
//     Electric: 2780,
//     Gas: 3908,
//     amt: 2000,
//     "Electric Delivery Percentage": 10.2,
//     "Gas Delivery Percentage": 15.5,
//     "Electric Low Tariff Consume": 7.9,
//     "Gas Low Tariff Consume": 13.8,
//   },
//   {
//     name: '2019',
//     Electric: 1890,
//     Gas: 4800,
//     amt: 2181,
//     "Electric Delivery Percentage": 9.9,
//     "Gas Delivery Percentage": 16.0,
//     "Electric Low Tariff Consume": 8.4,
//     "Gas Low Tariff Consume": 12.9,
//   },
//   {
//     name: '2020',
//     Electric: 2390,
//     Gas: 3800,
//     amt: 2500,
//     "Electric Delivery Percentage": 10.1,
//     "Gas Delivery Percentage": 15.8,
//     "Electric Low Tariff Consume": 8.0,
//     "Gas Low Tariff Consume": 13.2,
//   },
// ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf';

//
constructor(props) {
    super(props);
    this.state = {
      showElectric: true,
      showGas: true,
    };
  }

//   toggleElectric = () => {
//     this.setState((prevState) => ({ showElectric: !prevState.showElectric }));
//   };

//   toggleGas = () => {
//     this.setState((prevState) => ({ showGas: !prevState.showGas }));
//   };
//

// constructor(props) {
//   super(props);
//   this.state = {
//     Energy: [],
//   };
// }

// componentDidMount() {
//   fetchData("1").then((response) => {
//     const { data } = response;

//     const AnnualEnergy = [];
//     const AnnualDel = [];
//     const AnnualLowtarif = [];

//     data.forEach((item) => {
      
//         AnnualEnergy.push({ name: item.year, dataKey: item.electric_or_gas, value: item.total_annual_consume });
//         AnnualDel.push({ name: item.year, dataKey: (item.electric_or_gas + " Delivery Percentage"), value: item.total_delivery_perc });
//         AnnualLowtarif.push({ name: item.year, dataKey: item.electric_or_gas + " Low Tariff Consume", value: item.total_annual_consume_lowtarif_perc  });
//       });
componentDidMount() {
  fetchData("1").then((response) => {
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

      this.setState({ AnnualEnergy, AnnualDel, AnnualLowtarif });
    })
  }
  render() {
  console.log("Data Energy:", this.state.Energy);
  console.log("Annual consume",this.state.AnnualEnergy);
  console.log("Annual del",this.state.AnnualDel);
  console.log("Annual low tarif",this.state.AnnualLowtarif);
    const { showElectric, showGas } = this.props;
      return (
          <div style={{ width: '100%' }}>
        <h4>Annual Data Usage</h4>
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
                  return [`${value} KwH`, name];
                }
                if (name.includes("Gas")){
                    return [`${value} m3`, name];
                }

                }}/>
            {showElectric && <Area type="monotone" dataKey="Electric" stroke="#8884d8" fill="#8884d8" />}
            {showGas && <Area type="monotone" dataKey="Gas" stroke="#82ca9d" fill="#82ca9d" />}
            <Brush />
          </AreaChart>
        </ResponsiveContainer>

        <p>Maybe some other content</p>

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
            <YAxis tickFormatter={(value) => `${value}%`}/>
            <Tooltip 
            formatter={(value, name) => {
                    return [`${value} %`, name];
                }}/>
            {showElectric&&<Line type="monotone" dataKey="Electric Delivery Percentage" stroke="#8884d8" fill="#8884d8" />}
            {showGas&&<Line type="monotone" dataKey="Gas Delivery Percentage" stroke="#82ca9d" fill="#82ca9d" />}
          </LineChart>
        </ResponsiveContainer>

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
            <YAxis tickFormatter={(value) => `${value}%`}/>
            <Tooltip 
            formatter={(value, name) => {
                return [`${value} %`, name];
            }}/>
            {showElectric&&<Line type="monotone" dataKey="Electric Low Tariff Consume" stroke="#8884d8" fill="#8884d8" />}
            {showGas&&<Line type="monotone" dataKey="Gas Low Tariff Consume" stroke="#82ca9d" fill="#82ca9d" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

