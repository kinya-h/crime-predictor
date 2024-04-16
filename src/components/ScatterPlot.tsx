import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CrimeLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/meru_crime_df.csv");
      const data = await response.text();
      const rows = data.trim().split("\n");
      const parsedData = rows.map((row) => {
        const columns = row.split(",");
        return {
          year: parseInt(columns[0]),
          month: parseInt(columns[1]),
          day: parseInt(columns[2]),
          proximity_to_bank: parseFloat(columns[3]),
          type: columns[4],
          latitude: parseFloat(columns[5]),
          longitude: parseFloat(columns[6]),
        };
      });
      setData(parsedData);
    };

    fetchData();
  }, []);

  const yearlyData = data.reduce((acc, curr) => {
    const year = curr.year;
    if (!acc[year]) {
      acc[year] = { year, count: 0 };
    }
    acc[year].count++;
    return acc;
  }, {});

  const formattedData = Object.values(yearlyData).map((item) => ({
    year: item.year,
    count: item.count,
  }));

  return (
    <LineChart width={600} height={300} data={formattedData}>
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default CrimeLineChart;
