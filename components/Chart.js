"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Chart({ data }) {
  const chartData = {
    labels: data.map((_, i) => `#${i + 1}`),
    datasets: [
      {
        label: "Crop Prices",
        data: data.map((d) => d.price),
      },
    ],
  };

  return <Line data={chartData} />;
}