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
      ele_del_perc: 10.5,
      gas_del_perc: 15.2,
      ele_low_tar: 8.3,
      gas_low_tar: 12.7,
    },
    {
      name: '2016',
      Electric: 3000,
      Gas: 1398,
      amt: 2210,
      ele_del_perc: 11.0,
      gas_del_perc: 16.4,
      ele_low_tar: 7.8,
      gas_low_tar: 13.1,
    },
    {
      name: '2017',
      Electric: 2000,
      Gas: 9800,
      amt: 2290,
      ele_del_perc: 9.7,
      gas_del_perc: 14.8,
      ele_low_tar: 8.1,
      gas_low_tar: 12.5,
    },
    {
      name: '2018',
      Electric: 2780,
      Gas: 3908,
      amt: 2000,
      ele_del_perc: 10.2,
      gas_del_perc: 15.5,
      ele_low_tar: 7.9,
      gas_low_tar: 13.8,
    },
    {
      name: '2019',
      Electric: 1890,
      Gas: 4800,
      amt: 2181,
      ele_del_perc: 9.9,
      gas_del_perc: 16.0,
      ele_low_tar: 8.4,
      gas_low_tar: 12.9,
    },
    {
      name: '2020',
      Electric: 2390,
      Gas: 3800,
      amt: 2500,
      ele_del_perc: 10.1,
      gas_del_perc: 15.8,
      ele_low_tar: 8.0,
      gas_low_tar: 13.2,
    },
    {
      name: 'page g',
      Electric: 3490,
      Gas: 4300,
      amt: 2100,
      ele_del_perc: 10.8,
      gas_del_perc: 15.0,
      ele_low_tar: 8.5,
      gas_low_tar: 12.4,
    },
  ];
  // export default function ToggleGraph() {
  //   const [showElectric, setShowElectric] = useState(true);
  //   const [showGas, setShowGas] = useState(true);

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf';
  constructor(props) {
    super(props);
    this.state = {
      showElectric: true,
      showGas: true,
    };
  }

  toggleElectric = () => {
    this.setState((prevState) => ({ showElectric: !prevState.showElectric }));
  };

  toggleGas = () => {
    this.setState((prevState) => ({ showGas: !prevState.showGas }));
  };
  render() {
    const { showElectric, showGas } = this.state;
      return (
          <div style={{ width: '100%' }}>
        <h4>A demo of synchronized AreaCharts</h4>
        <button onClick={this.toggleElectric}>
          {showElectric ? "Hide Electric" : "Show Electric"}
        </button>
        <button onClick={this.toggleGas}>
          {showGas ? "Hide Gas" : "Show Gas"}
        </button>
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
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />            
            <Tooltip />
            {showElectric&&<Area yAxisId={"left"} type="monotone" dataKey="Electric" stroke="#8884d8" fill="#8884d8" />}
            {showGas&&<Area yAxisId={"right"} type="monotone" dataKey="Gas" stroke="#82ca9d" fill="#82ca9d" />}
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
            <YAxis />
            <Tooltip />
            {showElectric&&<Line type="monotone" dataKey="ele_del_perc" stroke="#8884d8" fill="#8884d8" />}
            {showGas&&<Line  type="monotone" dataKey="gas_del_perc" stroke="#82ca9d" fill="#82ca9d" />}
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
            <YAxis />
            <Tooltip />
            <Line showElectric type="monotone" dataKey="ele_low_tar" stroke="#8884d8" fill="#8884d8" />
            <Line showGas type="monotone" dataKey="gas_low_tar" stroke="#82ca9d" fill="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
