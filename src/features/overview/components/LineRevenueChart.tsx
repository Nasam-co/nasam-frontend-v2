"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useTranslation } from "react-i18next";
import { useDashboardStats } from "../hooks/useOverview";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import Riyal from "@/shared/components/common/Riyal";

export function LineRevenueChart() {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading } = useDashboardStats();

  // Memoize revenueTrend to prevent dependency issues
  const revenueTrend = React.useMemo(() => {
    return dashboardData?.revenueTrend || [];
  }, [dashboardData?.revenueTrend]);

  // Transform API data to chart format
  const chartData = React.useMemo(() => {
    if (revenueTrend.length === 0) return [];

    // Create a map to combine data from all marketplaces by date
    const dataMap = new Map();

    revenueTrend.forEach((marketplaceTrend: any) => {
      marketplaceTrend.trends.forEach((trend: any) => {
        const date = new Date(trend.date).toISOString().split("T")[0];

        if (!dataMap.has(date)) {
          dataMap.set(date, { date });
        }

        const existing = dataMap.get(date);
        existing[marketplaceTrend.marketplace.toLowerCase()] =
          trend.totalRevenue;
        existing[`${marketplaceTrend.marketplace.toLowerCase()}Orders`] =
          trend.totalOrders;
      });
    });

    return Array.from(dataMap.values()).sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [revenueTrend]);

  // Generate chart config dynamically based on available marketplaces
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      revenue: {
        label: t("overview.revenue"),
      },
    };

    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ];

    revenueTrend.forEach((marketplaceTrend: any, index: number) => {
      const key = marketplaceTrend.marketplace.toLowerCase();
      config[key] = {
        label: marketplaceTrend.marketplace,
        color: colors[index % colors.length],
      };
    });

    return config;
  }, [revenueTrend]);

  // Data is already filtered by the backend based on date range, so we just use chartData directly
  const filteredData = chartData;

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5">
          <div className="grid flex-1 gap-1">
            <CardTitle>{t("overview.revenueChart", "Revenue Chart")}</CardTitle>
            <CardDescription>
              {t("overview.noRevenueData", "No revenue data available")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="flex h-[250px] items-center justify-center text-muted-foreground">
            {t(
              "overview.noRevenueDataDescription",
              "Revenue trends will appear here once you have sales"
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle>{t("overview.revenueChart", "Revenue Chart")}</CardTitle>
          <CardDescription>
            {t(
              "overview.revenueChartDescription",
              "Showing total revenue trends by marketplace"
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.entries(chartConfig).map(([key, config]) => {
                if (key === "revenue") return null;
                return (
                  <linearGradient
                    key={key}
                    id={`fill${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={config.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={config.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: any) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value: any) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  formatter={(value: any, name: any, props: any) => {
                    // Check if this is revenue data (not orders)
                    if (!name.toString().includes("Orders")) {
                      const ordersKey = `${name}Orders`;
                      const orders = props.payload?.[ordersKey];
                      const marketplaceName =
                        chartConfig[name as keyof typeof chartConfig]?.label ||
                        name;

                      return [
                        <div key={name} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">
                              {marketplaceName}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            {t("overview.revenue")}:
                            <Riyal />
                            <span>{Number(value).toLocaleString()}</span>
                          </div>
                          {orders !== undefined && (
                            <div className="text-sm text-muted-foreground">
                              {t("overview.orders")}: {Number(orders).toLocaleString()}
                            </div>
                          )}
                        </div>,
                        "",
                      ];
                    }
                    // Don't show separate entries for orders (they're included in revenue tooltip)
                    return null;
                  }}
                  indicator="dot"
                />
              }
            />
            {Object.entries(chartConfig).map(([key, config]) => {
              if (key === "revenue") return null;
              return (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={`url(#fill${key})`}
                  stroke={config.color}
                  stackId="a"
                />
              );
            })}
            <ChartLegend
              content={
                <ChartLegendContent payload={[]} verticalAlign="bottom" />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
