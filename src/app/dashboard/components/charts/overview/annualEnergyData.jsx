"use client"
import React, { PureComponent } from 'react';
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

const data = [
  {
    name: '2015',
    Electric: 4000,
    Gas: 2400,
    amt: 2400,
    "Electric Delivery Percentage": 10.5,
    "Gas Delivery Percentage": 15.2,
    "Electric Low Tariff Consume": 8.3,
    "Gas Low Tariff Consume": 12.7,
  },
  {
    name: '2016',
    Electric: 3000,
    Gas: 1398,
    amt: 2210,
    "Electric Delivery Percentage": 11.0,
    "Gas Delivery Percentage": 16.4,
    "Electric Low Tariff Consume": 7.8,
    "Gas Low Tariff Consume": 13.1,
  },
  {
    name: '2017',
    Electric: 2000,
    Gas: 9800,
    amt: 2290,
    "Electric Delivery Percentage": 9.7,
    "Gas Delivery Percentage": 14.8,
    "Electric Low Tariff Consume": 8.1,
    "Gas Low Tariff Consume": 12.5,
  },
  {
    name: '2018',
    Electric: 2780,
    Gas: 3908,
    amt: 2000,
    "Electric Delivery Percentage": 10.2,
    "Gas Delivery Percentage": 15.5,
    "Electric Low Tariff Consume": 7.9,
    "Gas Low Tariff Consume": 13.8,
  },
  {
    name: '2019',
    Electric: 1890,
    Gas: 4800,
    amt: 2181,
    "Electric Delivery Percentage": 9.9,
    "Gas Delivery Percentage": 16.0,
    "Electric Low Tariff Consume": 8.4,
    "Gas Low Tariff Consume": 12.9,
  },
  {
    name: '2020',
    Electric: 2390,
    Gas: 3800,
    amt: 2500,
    "Electric Delivery Percentage": 10.1,
    "Gas Delivery Percentage": 15.8,
    "Electric Low Tariff Consume": 8.0,
    "Gas Low Tariff Consume": 13.2,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf';

//
// constructor(props) {
//     super(props);
//     this.state = {
//       showElectric: true,
//       showGas: true,
//     };
//   }

//   toggleElectric = () => {
//     this.setState((prevState) => ({ showElectric: !prevState.showElectric }));
//   };

//   toggleGas = () => {
//     this.setState((prevState) => ({ showGas: !prevState.showGas }));
//   };
//


  render() {
    const { showElectric, showGas } = this.props;
    // const { showElectric, showGas } = this.state;
      return (
          <div style={{ width: '100%' }}>
        <h4>Annual Data Usage</h4>
        {/* <button onClick={this.toggleElectric}>
          {showElectric ? "Hide Electric" : "Show Electric"}
        </button>
        <button onClick={this.toggleGas}>
          {showGas ? "Hide Gas" : "Show Gas"}
        </button> */}
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
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
            {showGas&&<Area type="monotone" dataKey="Gas" stroke="#82ca9d" fill="#82ca9d" />}
            <Brush />
          </AreaChart>
        </ResponsiveContainer>

        <p>Maybe some other content</p>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
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
            data={data}
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
