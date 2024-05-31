// app/PieChart.jsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Import ApexCharts dynamically to ensure it works with Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Series A", "Series B", "Series C", "Series D", "Series E"],
      legend: {
        position: "bottom", // Show legend below the chart
      },
      height: 400, // Increase height here
      width: "100%", // Adjust width as needed
    },
  });

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/ChartsData/pie-chart"); // Replace with your API endpoint
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
    <div className="w-full h-full">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default PieChart;
