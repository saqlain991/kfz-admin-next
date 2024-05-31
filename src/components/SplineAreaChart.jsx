// app/SplineAreaChart.jsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Import ApexCharts dynamically to ensure it works with Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SplineAreaChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Series 1",
        data: [10, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: [],
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: true,
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      colors: ["#F97316"],
      //   fill: {
      //     type: "gradient",
      //     gradient: {
      //       shadeIntensity: 1,
      //       opacityFrom: 0.7,
      //       opacityTo: 0.9,
      //       stops: [0, 90, 100],
      //     },
      //   },
      yaxis: {
        title: {
          text: "Amount",
        },
      },
    },
  });

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/ChartsData/spline-area-data"); // Replace with your API endpoint
        const { series, categories } = response.data;

        setChartData({
          series: series,
          options: {
            ...chartData.options,
            xaxis: {
              categories: categories,
            },
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
      {/* <h1>Spline Area Chart</h1> */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        width="100%"
        height={350}
      />
    </div>
  );
};

export default SplineAreaChart;
