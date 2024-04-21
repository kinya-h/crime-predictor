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
      const parsedData :any= rows.map((row) => {
        const columns = row.split(",");
        return {
          year: parseInt(columns[0]),
          month: parseInt(columns[1]),
          time: columns[2],
          day: parseInt(columns[3]),
          proximity_to_bank: parseFloat(columns[4]),
          type: columns[5],
          latitude: parseFloat(columns[6]),
          longitude: parseFloat(columns[7]),
        };
      });
      setData(parsedData);
    };
    fetchData();
  }, []);

  const yearlyData = data.reduce((acc:any, curr:any) => {
    const year = curr.year;
    if (!acc[year]) {
      acc[year] = { year, count: 0, times: {} };
    }
    acc[year].count++;
    const time = curr.time;
    if (!acc[year].times[time]) {
      acc[year].times[time] = 0;
    }
    acc[year].times[time]++;
    return acc;
  }, {});

  const formattedData = Object.values(yearlyData).map((item:any) => ({
    year: item.year,
    count: item.count,
    mostFrequentTime: Object.entries(item.times).sort(
      (a, b) => b[1] - a[1] 
    )[0][0],
  }));

  const CustomTooltip = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
      const mostFrequentTime = payload[0].payload.mostFrequentTime;
      return (
        <div className="custom-tooltip">
          <p className="label">{`Year: ${label}`}</p>
          <p className="intro">{`Most Frequent Time: ${mostFrequentTime}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <LineChart width={600} height={300} data={formattedData}>
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomTooltip />} />
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