"use client";

import { Title, Card, AreaChart } from "@tremor/react";

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
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
    "UV Index": results.hourly.uv_index[i],
    "Temperature (°C)": results.hourly.temperature_2m[i],
  }));

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (°C)", "UV Index"]}
        colors={["yellow", "cyan"]}
        minValue={0}
        yAxisWidth={40}
        valueFormatter={(value) => `${value} °C`}
      />
    </Card>
  );
}

export default TempChart;
