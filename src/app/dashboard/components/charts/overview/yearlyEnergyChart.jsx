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
  },
  {
    name: '2016',
    Electric: 3000,
    Gas: 1398,
    amt: 2210,
  },
  {
    name: '2017',
    Electric: 2000,
    Gas: 9800,
    amt: 2290,
  },
  {
    name: '2018',
    Electric: 2780,
    Gas: 3908,
    amt: 2000,
  },
  {
    name: '2019',
    Electric: 1890,
    Gas: 4800,
    amt: 2181,
  },
  {
    name: '2020',
    Electric: 2390,
    Gas: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    Electric: 3490,
    Gas: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf';

  render() {
    return (
      <div style={{ width: '100%' }}>
        <h4>A demo of synchronized AreaCharts</h4>

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
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Electric" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
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
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Gas" stroke="#82ca9d" fill="#82ca9d" />
            <Brush />
          </LineChart>
        </ResponsiveContainer>

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
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
