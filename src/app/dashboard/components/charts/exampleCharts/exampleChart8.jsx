"use client"
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 },
];

export default class Example extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <h4>A demo of synchronized LineCharts with multiple lines</h4>

        {/* First Chart with Two Lines */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            syncId="anyId"
            margin={{ top: 10, right: 50, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {/* Left Y-axis for 'uv' */}
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              domain={['auto', 'auto']} 
              tickFormatter={(tick) => `${tick}`} 
            />
            {/* Right Y-axis for 'pv' */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={['auto', 'auto']} 
              tickFormatter={(tick) => `${tick}`} 
            />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <p>Maybe some other content</p>

        {/* Second Chart with Two Lines */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            syncId="anyId"
            margin={{ top: 10, right: 50, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {/* Left Y-axis for 'uv' */}
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              domain={['auto', 'auto']} 
              tickFormatter={(tick) => `${tick}`} 
            />
            {/* Right Y-axis for 'pv' */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={['auto', 'auto']} 
              tickFormatter={(tick) => `${tick}`} 
            />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
