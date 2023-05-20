"use client";

import { Title, Card, AreaChart } from "@tremor/react";

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const hourData = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourData.map((hour, i) => ({
    time: Number(hour),
    "Humidity (%)": results.hourly.relativehumidity_2m[i],
  }));

  return (
    <Card>
      <Title>Humidity Probability</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Humidity (%)"]}
        colors={["gray"]}
        minValue={0}
        maxValue={100}
        yAxisWidth={40}
        valueFormatter={(value) => `${value}  %`}
      />
    </Card>
  );
}

export default HumidityChart;
