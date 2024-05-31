// app/RadialBarChart.jsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Import ApexCharts dynamically to ensure it works with Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialBarChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 67, 83],
    options: {
      chart: {
        type: "radialBar",
        height: 350,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },

            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return 249;
              },
            },
          },
        },
      },
      labels: ["Product A", "Product B", "Product C", "Product D"],
    },
  });

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        // const response = await axios.get("/api/radial-bar-data"); //Here put your API Path.
        const { series, labels } = response.data;

        setChartData({
          series: series,
          options: {
            ...chartData.options,
            labels: labels,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Radial Bar Chart</h1>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default RadialBarChart;
