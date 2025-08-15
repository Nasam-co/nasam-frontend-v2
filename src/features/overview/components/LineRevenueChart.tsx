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
import { useDashboardStats } from "../hooks/useOverview";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineRevenueChart() {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />
      </div>
    );
  }

  const revenueTrend = dashboardData?.revenueTrend || [];
  const marketplaces = dashboardData?.marketplaces || [];

  // if (revenueTrend.length === 0) {
  //   return (
  //     <div className="w-full h-96 flex flex-col items-center justify-center bg-white shadow-md rounded-lg">
  //       <div className="text-center">
  //         <div className="text-4xl mb-4">📊</div>
  //         <h3 className="text-lg font-medium text-gray-900 mb-2">
  //           {t("overview.noRevenueData", "No Revenue Data")}
  //         </h3>
  //         <p className="text-gray-500">
  //           {t(
  //             "overview.noRevenueDataDescription",
  //             "Revenue trends will appear here once you have sales"
  //           )}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // Extract labels from revenue trend data
  const labels = revenueTrend.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  // Create datasets based on available marketplaces or use single revenue dataset
  const datasets =
    marketplaces.length > 0
      ? marketplaces.map((marketplace, index) => {
          const colors = [
            {
              border: "rgb(255, 159, 64)",
              background: "rgba(255, 159, 64, 0.2)",
            },
            {
              border: "rgb(75, 192, 192)",
              background: "rgba(75, 192, 192, 0.2)",
            },
            {
              border: "rgb(153, 102, 255)",
              background: "rgba(153, 102, 255, 0.2)",
            },
            {
              border: "rgb(255, 99, 132)",
              background: "rgba(255, 99, 132, 0.2)",
            },
            {
              border: "rgb(54, 162, 235)",
              background: "rgba(54, 162, 235, 0.2)",
            },
          ];
          const color = colors[index % colors.length];

          return {
            label: marketplace.name,
            data: revenueTrend.map(
              (item) => item.revenue / marketplaces.length
            ), // Distribute revenue evenly for demo
            borderColor: color.border,
            backgroundColor: color.background,
            tension: 0.1,
          };
        })
      : [
          {
            label: "Revenue",
            data: revenueTrend.map((item) => item.revenue),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
          },
        ];

  const data = {
    labels,
    datasets,
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
