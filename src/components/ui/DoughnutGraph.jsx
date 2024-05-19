"use client";
// components/DoughnutChart.jsx
import React, { useEffect, useState } from "react";
import {
  Doughnut,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
} from "recharts";

// Custom Active Shape for Pie Chart Segments
const CustomActiveShapePieChart = ({
  cx,
  cy,
  fill,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + ((outerRadius - innerRadius) * percent) / 100;

  const x = cx + radius * Math.cos(-startAngle * RADIAN);
  const y = cy + radius * Math.sin(-startAngle * RADIAN);

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={innerRadius}
        fill="#fff"
        stroke="#eee"
        strokeWidth={2}
        fillOpacity={0.3}
      />
      <path
        d={`M${cx},${cy}a${outerRadius},${outerRadius} 0 0,1 ${radius},0a${innerRadius},${innerRadius} 0 0,1 ${-radius},0`}
        fill={fill}
      />
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    </g>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Define the COLORS array

const DoughnutChart = () => {
  const [data, setData] = useState([]);
  const [staticData, setStaticData] = useState([
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ]);

  // Use this for dynamic data fetching
  //   useEffect(() => {
  //     // Simulate fetching data from an API
  //     const fetchData = async () => {
  //       const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your actual API endpoint
  //       const result = await response.json();
  //       setData(result);
  //     };

  //     fetchData();
  //   }, []);

  // Combine static and dynamic data
  const combinedData = [...staticData, ...data];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={combinedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {combinedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
