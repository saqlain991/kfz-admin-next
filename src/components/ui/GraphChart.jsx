"use client";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 2000 },
  { name: "Apr", total: 2780 },
  { name: "May", total: 1890 },
  { name: "Jun", total: 2390 },
  { name: "Jul", total: 3490 },
];

const BarGraph = () => {
  // use this for dynamic api calling //
  // useEffect(() => {
  //   // Replace this URL with your actual API endpoint
  //   fetch('https://api.example.com/data')
  //    .then((response) => response.json())
  //    .then((data) => setData(data));
  // }, []);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="total"
          fill="#F97316"
          barSize={30}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
