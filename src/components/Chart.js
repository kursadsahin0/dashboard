import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Chart.js bileşenlerini kaydediyoruz
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ChartComponent({ data }) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [data]);

  const chartData = useMemo(() => {
    return {
      labels: sortedData.map((item) => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: "Gerçek Zamanlı Değerler",
          data: sortedData.map((item) => item.value),
          borderColor: "#872341",
          backgroundColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  }, [sortedData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => tooltipItem[0].label,
          label: (tooltipItem) => `Değer: ${tooltipItem.raw}`,
        },
        backgroundColor: "#211C84",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  }), []);

  return (
    <div style={{ height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
