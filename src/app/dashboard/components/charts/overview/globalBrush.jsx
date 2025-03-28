import React, { useState } from "react";
import { Brush, ResponsiveContainer, LineChart, XAxis } from "recharts";

const GlobalBrush = ({ data, onChange }) => {
  const [range, setRange] = useState([data[0]?.name, data[data.length - 1]?.name]);

  const handleChange = (newRange) => {
    setRange(newRange);
    onChange(newRange);
  };

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <Brush
          dataKey="name"
          height={30}
          stroke="#8884d8"
          onChange={handleChange}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GlobalBrush;

