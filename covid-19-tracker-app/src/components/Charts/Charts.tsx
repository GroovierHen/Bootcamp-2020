import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData, DailyApiResponse, ApiResponse } from "../../api";

interface Props {
  data: ApiResponse.RootObject;
  country: string;
}

const Charts: React.FC<Props> = ({ data, country }) => {
  const [dailyData, setDailyData] = useState<DailyApiResponse.RootObject[]>([]);

  useEffect(() => {
    (async () => {
      setDailyData(await fetchDailyData());
    })();
  }, []);

  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ reportDate }) => reportDate),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  if (!data) {
    return <div>Loading!...</div>;
  }

  const { confirmed, recovered, deaths } = data;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className="chart_container">{country ? barChart : lineChart}</div>
  );
};

export default Charts;
