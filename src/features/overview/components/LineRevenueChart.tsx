import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function LineRevenueChart() {
  const { t } = useTranslation();
  const data = {
    labels,
    datasets: [
      {
        label: t("header.amazon"),
        data: [12000, 15000, 18000, 22000, 25000, 28000, 32000],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.1,
      },
      {
        label: t("header.noon"),
        data: [8000, 10000, 12000, 15000, 18000, 21000, 24000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
      {
        label: t("header.trendyol"),
        data: [5000, 7000, 9000, 11000, 14000, 17000, 20000],
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("overview.revenueChartByMarketplace"),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            const value =
              typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Line options={options} data={data} width={500} />
    </div>
  );
}
